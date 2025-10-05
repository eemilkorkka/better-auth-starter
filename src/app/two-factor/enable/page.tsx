import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Enable2FAButton } from "@/components/Enable2FAButton/Enable2FAButton";

export default async function EnableTwoFactorPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        redirect("/");
    }

    if (session.user.twoFactorEnabled) {
        redirect("/secretpage");
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen gap-4">
            <h1 className="text-2xl">Help protect your account 🔐</h1>
            <div className="rounded-lg max-w-[400px] p-8 border border-gray-200 flex flex-col gap-4">
                <h1 className="text-xl font-bold">You don't have two factor authentication enabled ⚠️</h1>
                <p>Would you like to enable it?</p>
                <div className="flex gap-4">
                    <Enable2FAButton />
                    <Link href="/secretpage">
                        <Button variant="destructive" className="hover:cursor-pointer">Continue without 2FA</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}