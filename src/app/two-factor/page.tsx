import { VerificationCodeStep } from "@/components/Enable2FAButton/steps/VerificationCodeStep";

export default async function twoFactorAuthPage() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="rounded-lg max-w-[400px] p-8 border border-gray-200 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold">Two Factor Authentication</h1>
                    <p className="text-gray-500">To sign in, please enter the verification code from your authenticator app below.</p>
                </div>
                <VerificationCodeStep />
            </div>
        </div>
    )
}