"use server";
import { LogoutButton } from "@/components/LogoutButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function SecretPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        redirect("/");
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen gap-4">
            <h1 className="text-3xl font-bold">This is a secret page</h1>
            <p className="text-lg">You can see this because you are logged in 🎉</p>
            <LogoutButton />
        </div>
    );
}