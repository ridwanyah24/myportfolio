'use client'
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { RotateCw } from "lucide-react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from './button'
import { useForm } from 'react-hook-form'
import { useLoginMutation } from '@/slices/requestSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/react-hoot'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { selectCurrentUserToken, setAuthData } from '@/slices/authSlice'
import { createCookie } from '@/app/utils/cookies'
import { ToastAction } from '@radix-ui/react-toast'
import { Toaster } from './toaster'


const loginSchema = z.object({
    email: z.string().email({message: "enter your email"}),
    password: z.string().min(8, {message: "password must be greater than 8 charcaters"}).max(10, {message: "password must not be greater than 10 characters"})
})

export function LoginForm(){
    const selectToken = useAppSelector(selectCurrentUserToken);
    const [login, {isLoading, }] = useLoginMutation();
    const dispatch = useAppDispatch();
    const {toast} = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email : "",
            password : ""
        }
    })

    async function onSubmit(data: z.infer<typeof loginSchema>, e: any){
      e.preventDefault();
      const formData = new FormData();
      
      formData.append("email", data?.email);
      formData.append("password", data?.password);

      const request = login(formData)
        .unwrap()
        .then(async (originalPromiseResult) =>{
            console.log("firstStage")
            console.log(originalPromiseResult);
            
            toast({
                variant: "success",
                description: "login Succesfull;"
            });
            dispatch(
                setAuthData({access_token:originalPromiseResult?.access_token, status:originalPromiseResult?.status})
            );
            createCookie("accessToken", originalPromiseResult?.access_token, {
                path: "/",
                expires: 7,
                secure: true,
            });
            router.push("/updatePortfolio");
        }).catch((rejectedValueOrSerializeError)=>{
            toast({
                variant: "destructive",
                title: "Uh Oh! something went wrong. ",
                description: rejectedValueOrSerializeError?.data?.message,
                action: <ToastAction altText='try again'>Try again</ToastAction>
            })
        })
    }
    console.log(selectToken);
    
    return(
        <>
        <Toaster />
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">Email</FormLabel>
                    <FormControl>
                        <Input
                        placeholder="Enter your email"
                        {...field}
                        type="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </FormControl>
                    <FormDescription className="text-gray-500 text-sm">
                        Enter the email you use for account login.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">Password</FormLabel>
                    <FormControl>
                        <Input
                        placeholder="Enter your password"
                        {...field}
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </FormControl>
                    <FormDescription className="text-gray-500 text-sm">
                        Your password must be at least 8 characters long.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button 
                type="submit" 
                variant="default" 
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all"
                disabled={isLoading}
                >
                 <RotateCw 
                 className={`mr-2 h-4 w-4 animate-spin ${
                    isLoading ? "block" : "hidden"
                  } `}
                 />
                Login
                </Button>
            </form>
        </Form>
        </>
    )
}


