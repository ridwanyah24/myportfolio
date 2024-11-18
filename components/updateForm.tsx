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

// const updateSchema = z.object({
//     projectName: z.string({message:"enter project Name"}).min(2, {message:"Enter a project Name"}),
//     projectDescription: z.string({message:"enter project description"}).min(200, {message: "minimum of 200 characters"}),
//     companyName: z.string({message:"enter company Name"}).min(2, {message:"Enter the organization name"}),
//     workDescription: z.string().min(2, {message:"enter work description"}),
//     linkToProject: z.string(),
//     projectImage: z
//     .union([
//       z.instanceof(File, { message: "Upload a valid image file" }),
//       z.string({ message: "Provide a valid image URL" }),
//     ])
//     .optional(),
// })

const updateSchema = z.object({
    projects: z
      .array(
        z.object({
          projectName: z.string({ message: "Enter project name" }),
          projectUrl: z.string({ message: "Enter project name" }).min(10, {message:"enter project url"}),
          projectDescription: z
            .string({ message: "Enter project description" })
            .min(200, { message: "Minimum of 200 characters" }),
        })
      )
      .min(1, { message: "At least one project is required" }),
    works: z.array(
        z.object({
            companyName: z.string({message: "Enter company Name"}),
            workDescription: z.string({message: "enter work description"}).
            min(200, {message:'minimum of 200 characters'}),
        })
    )
});
  
type UpdateFormValues = z.infer<typeof updateSchema>;
  
export default function UpdatePortfolioForm() {
    const form = useForm<UpdateFormValues>({
      resolver: zodResolver(updateSchema),
      defaultValues: {
        projects: [
          {
            projectName: "",
            projectDescription: "",
            projectUrl: ""
          },
        ],
        works : [
            {
                companyName : "",
                workDescription : ""
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

  
    function onSubmit(values: UpdateFormValues) {
      console.log("Form submitted:", values);
    }
  
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
                name={`projects.${index}.projectName`}
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
                name={`projects.${index}.projectUrl`}
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
                name={`projects.${index}.projectDescription`}
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
                name={`works.${index}.companyName`}
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
                name={`works.${index}.workDescription`}
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
              appendProject({ projectName: "", projectDescription: "", projectUrl: "" })
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
            appendWork({ workDescription: "", companyName: ""})
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
          </Button>
        </form>
      </Form>
    );
  }