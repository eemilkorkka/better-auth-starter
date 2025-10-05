"use client";

import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod";
import { Button } from "../../ui/button";

export const formSchema = z.object({
    verificationCode: z.string().min(6).max(6)
});

export const VerificationCodeStep = () => {

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            verificationCode: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const { data, error } = await authClient.twoFactor.verifyTotp({
            code: values.verificationCode,
            trustDevice: true,
        });

        if (error && error.message) {
            toast.error(error.message);
        } else {
            toast.success("Two-Factor Authentication enabled successfully.");
            router.push("/secretpage");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <FormField
                    control={form.control}
                    name="verificationCode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Time-Based One-Time Password</FormLabel>
                            <FormControl className="outline outline-gray-350 rounded-sm px-2 p-1 focus:outline-black focus:outline-2">
                                <InputOTP maxLength={6} {...field}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
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