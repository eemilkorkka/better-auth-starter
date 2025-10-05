import { Button } from "../../ui/button";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod";

import { SetStateAction } from "react";

interface PasswordStepProps {
    setStep: React.Dispatch<SetStateAction<number>>;
    setQrCode: React.Dispatch<SetStateAction<string>>;
}

export const formSchema = z.object({
    password: z.string().min(8).max(50),
});

export const PasswordStep = ({ setStep, setQrCode }: PasswordStepProps) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const { data, error } = await authClient.twoFactor.enable({
            password: values.password,
            issuer: "better-auth-starter"
        });

        if (error && error.message) {
            toast.error(error.message);
        } else {
            const { data, error } = await authClient.twoFactor.getTotpUri({
                password: values.password,
            });

            if (!error) {
                setQrCode(data.totpURI || "");
                setStep(1);
            }
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
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
                <Button type="submit" className="hover:cursor-pointer mt-4">Continue</Button>
            </form>
        </Form>
    )
}