"use client";
import { Button } from "./ui/button"
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export const LogoutButton = () => {

    const router = useRouter();

    const onClick = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/");
                }
            }
        });
    }

    return (
        <Button onClick={onClick}>Log out</Button>
    )
}