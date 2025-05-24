// components/MyForm.tsx
'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
})

export default function MyForm() {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dob: undefined,
      name: "",
      email: "",
    },
  })

  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // You can send formData to an API here
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Selected date:", data);
  }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4 max-w-md mx-auto bg-white rounded-xl shadow-md" suppressHydrationWarning>
      <div>
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      

      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Your name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="you@example.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button type="submit">Submit</Button>
    </form>
    </Form>
  );
}



{/* <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
        />
      </div> */}


// 'use client'

// import Link from 'next/link'
// import { z } from 'zod'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useForm } from 'react-hook-form'
// import { toast } from 'sonner'

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form'
// import { Button } from '@/components/ui/button'
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card'
// import { Input } from '@/components/ui/input'

// // Improved schema with additional validation rules
// const formSchema = z.object({
//   email: z.string().email({ message: 'Invalid email address' }),
//   password: z
//     .string()
//     .min(6, { message: 'Password must be at least 6 characters long' })
//     .regex(/[a-zA-Z0-9]/, { message: 'Password must be alphanumeric' }),
// })

// export default function LoginPreview() {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//   })

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     try {
//       // Assuming an async login function
//       console.log(values)
//       toast(
//         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//           <code className="text-white">{JSON.stringify(values, null, 2)}</code>
//         </pre>,
//       )
//     } catch (error) {
//       console.error('Form submission error', error)
//       toast.error('Failed to submit the form. Please try again.')
//     }
//   }

//   return (
//     <div className="flex flex-col min-h-[50vh] h-full w-full items-center justify-center px-4" suppressHydrationWarning>
//       <Card className="mx-auto max-w-sm">
//         <CardHeader>
//           <CardTitle className="text-2xl">Login</CardTitle>
//           <CardDescription>
//             Enter your email and password to login to your account.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//               <div className="grid gap-4">
//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem className="grid gap-2">
//                       <FormLabel htmlFor="email">Email</FormLabel>
//                       <FormControl>
//                         <Input
//                           id="email"
//                           placeholder="johndoe@mail.com"
//                           type="email"
//                           autoComplete="email"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <Button type="submit" className="w-full">
//                   Login
//                 </Button>
//                 <Button variant="outline" className="w-full">
//                   Login with Google
//                 </Button>
//               </div>
//             </form>
//           </Form>
//           <div className="mt-4 text-center text-sm">
//             Don&apos;t have an account?{' '}
//             <Link href="#" className="underline">
//               Sign up
//             </Link>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
