'use client'

import { ControllerFieldState, ControllerRenderProps, useForm, UseFormStateReturn } from 'react-hook-form'
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
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

const loginSchema = z.object({
    email: z.string().email({message: "enter your email"}),
    password: z.string().min(8, {message: "password must be greater than 8 charcaters"}).max(10, {message: "password must not be greater than 10 characters"})
})

export function LoginForm(){
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email : "",
            password : ""
        }
    })
    
    function onSubmit(values: z.infer<typeof loginSchema>){
        console.log(values);
    }

    return(
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
                <Button type="submit" variant="default" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all">
                Submit
                </Button>
            </form>
        </Form>
    )
}


