"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import toast from "react-hot-toast";

const formSchema = z.object({
    email: z.email().min(2).max(50),
    password: z
        .string().min(8).max(50)
});

export const LoginForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const { error } =  await authClient.signIn.email({
            email: data.email,
            password: data.password,
            callbackURL: "/secretpage"
        });

        if (error && error.message) {
            toast.error(error.message);
        } else {
            toast.success("Login successful!");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="border border-gray-200 p-8 rounded-lg flex flex-col gap-6 w-100">
                <div>
                    <h1 className="text-2xl font-bold">Login</h1>
                    <p className="text-gray-500">Enter your credentials below to login</p>
                </div>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl className="outline outline-gray-350 rounded-sm px-2 p-1 focus:outline-black focus:outline-2">
                                <input placeholder="johndoe@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl className="outline outline-gray-350 rounded-sm px-2 p-1 focus:outline-black focus:outline-2">
                                <input placeholder="********" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="hover:cursor-pointer">Login</Button>
                <p>Don't have an account? <Link href="/signup" className="text-gray-500 underline hover:cursor-pointer">Signup</Link></p>
            </form>
        </Form>
    );
}