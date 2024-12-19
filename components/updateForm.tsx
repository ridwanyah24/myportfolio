'use client'
import {useFieldArray, useForm} from 'react-hook-form'
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { useAddCompanyMutation, useAddProjectMutation } from '@/slices/requestSlice'
import { toast } from '@/hooks/use-toast'
import { ToastAction } from '@radix-ui/react-toast'
import { RotateCw } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'


const updateSchema = z.object({
    projects: z
      .array(
        z.object({
          name: z.string({ message: "Enter project name" }),
          url: z.string({ message: "Enter project name" }).min(10, {message:"enter project url"}),
          description: z
            .string({ message: "Enter project description" })
            .min(200, { message: "Min of 200 characters" }),
          image: z.union([
          z.instanceof(File, { message: "Upload a valid image file" }),
          z.string({ message: "Provide a valid image URL" }),
        ])
        })
      ).min(1, { message: "At least one project is required" }).optional(),
    works: z.array(
        z.object({
            name: z.string({message: "Enter company Name"}),
            description: z.string({message: "enter work description"}).
            min(200, {message:'minimum of 200 characters'}),
        })
    ).optional()
});

type UpdateFormValues = z.infer<typeof updateSchema>;
  
export default function UpdatePortfolioForm() {
  
  const router = useRouter();
  const [addCompany, {isLoading, }] = useAddCompanyMutation();
  const [addProject, {isLoading:addProjectLoading, }] = useAddProjectMutation();

  const form = useForm<UpdateFormValues>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      projects: [
        {
          name: "",
          description:"",
          url: "",
          image: ""
        },
      ],
      works : [
        {
         name : "",
         description: ""
        }
      ]
    },
  });

  const { fields: projectFeild , append:appendProject, remove: removeProject } = useFieldArray({
    control: form.control,
    name: "projects",
  });

  const { fields: workFeild , append:appendWork, remove: removeWork } = useFieldArray({
      control: form.control,
      name: "works",
    });

    async function onSubmit(values: UpdateFormValues, e: any) {
      e.preventDefault();
      // Ensure projects and works arrays are defined
      const projects = values.projects || [];
      const works = values.works || [];

      console.log(values.projects, works);
      
      // Function to create FormData for projects
      const createProjectFormData = (project: any) => {
        const formData = new FormData();
        formData.append("name", project.name);
        formData.append("description", project.description);
        formData.append("url", project.url);
        if (project.image instanceof File) {
          formData.append("image", project.image);
        }
        return formData;
      };

      // Function to create FormData for works
      const createWorkFormData = (work: any) => {
        const formData = new FormData();
        formData.append("name", work.name);
        formData.append("description", work.description);
        return formData;
      };
    
      // Submit projects
      const projectRequests: Promise<void>[] = projects?.map((project) =>
        addProject(createProjectFormData(project))
          .unwrap()
          .then(() => {
            toast({
              variant: "success",
              description: `Project "${project.name}" added successfully.`,
            });
          })
          .catch((error) => {
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: error?.data?.message || "Failed to add project.",
              action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
          })
      );
    
      // Submit works
      const workRequests: Promise<void>[] = works.map((work) =>
        addCompany(createWorkFormData(work))
          .unwrap()
          .then(() => {
            toast({
              variant: "success",
              description: `Work at "${work.name}" added successfully.`,
            });
          })
          .catch((error) => {
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: error?.data?.message || "Failed to add work.",
              action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
          })
      );
    
      // Wait for all requests to finish
      try {
        await Promise.all([...workRequests, ...projectRequests]);
        toast({
          variant: "success",
          description: "All data submitted successfully!",
        });
        router.push("/")
      } catch (error) {
        console.error("Some requests failed:", error);
      }
    }    
  // console.log(selectToken);
    
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg"
      >
        {projectFeild.map((field, index) => (
          <div
            key={field.id}
            className="border rounded-lg p-4 space-y-4 bg-gray-50"
          >
            <FormField
              control={form.control}
              name={`projects.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">
                    Project Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter project name"
                      {...field}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`projects.${index}.url`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">
                  Project Url
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter project name"
                      {...field}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`projects.${index}.description`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">
                    Project Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter project description"
                      {...field}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </FormControl>
                  <FormDescription className="text-gray-500 text-sm">
                    Minimum of 200 characters.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Project Image */}
            <FormField
              control={form.control}
              name={`projects.${index}.image`}
              render={({ field }) => (
              <FormItem>
              <FormLabel className="text-gray-700 font-semibold">Project Image</FormLabel>
              <FormControl>
                  <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                      field.onChange(e.target.files[0]);
                      }
                  }}
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
              </FormControl>
              <FormDescription className="text-gray-500 text-sm">
                  Upload an image for your project.
              </FormDescription>
              <FormMessage />
              </FormItem>
          )}
          />
            <Button
              variant="ghost"
              type="button"
              onClick={() => removeProject(index)}
              className="text-red-500 hover:text-red-600"
            >
              Remove Project
          </Button>
          </div>
        ))}

      {workFeild.map((field, index) => (
          <div
            key={field.id}
            className="border rounded-lg p-4 space-y-4 bg-gray-50"
          >
            <FormField
              control={form.control}
              name={`works.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">
                    Company Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Company Name"
                      {...field}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`works.${index}.description`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">
                    Work Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter project description"
                      {...field}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </FormControl>
                  <FormDescription className="text-gray-500 text-sm">
                    Minimum of 200 characters.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant="ghost"
              type="button"
              onClick={() => removeWork(index)}
              className="text-red-500 hover:text-red-600"
            >
              Remove Work
          </Button>
      </div>
      ))}

      <Button
          variant="ghost"
          type="button"
          onClick={() =>
            appendProject({ name: "", description: "", url: "", image: "" })
          }
          className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
        >
          <span>Add Project</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </Button>
        
        <Button
          variant="ghost"
          type="button"
          onClick={() =>
          appendWork({ description: "", name: ""})
          }
          className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
        >
          <span>Add Work</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </Button>
        <Button type="submit" variant="default" className="w-full">
          Submit
          <RotateCw 
          className={`mr-2 h-4 w-4 animate-spin ${
            isLoading || addProjectLoading ? "block" : "hidden"
          } `}
          />
        </Button>
      </form>
    </Form>
  );
}