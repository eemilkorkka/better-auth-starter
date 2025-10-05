"use client";
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { VerificationCodeStep } from "./steps/VerificationCodeStep";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { PasswordStep } from "./steps/PasswordStep";
import { QrCodeStep } from "./steps/QrCodeStep";

export const Enable2FAButton = () => {

    const [step, setStep] = useState(0);
    const [open, setOpen] = useState(false);
    const [qrCode, setQrCode] = useState("");

    const stepTitles: string[] = [
        "Password required",
        "Scan QR code",
        "Enter verification code"
    ];

    const stepDescriptions: string[] = [
        "To enable two factor authentication, please enter your password.",
        "Scan the QR code below with your authenticator app.",
        "Enter the verification code from your authenticator app."
    ];

    const renderStep = () => {
        switch (step) {
            case 0:
                return <PasswordStep setStep={setStep} setQrCode={setQrCode} />;
            case 1:
                return <QrCodeStep value={qrCode} setStep={setStep} />;
            case 2:
                return <VerificationCodeStep />
            default:
                return <PasswordStep setStep={setStep} setQrCode={setQrCode} />;
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="hover:cursor-pointer">Enable</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{stepTitles[step]}</DialogTitle>
                    <DialogDescription>
                        {stepDescriptions[step]}
                    </DialogDescription>
                </DialogHeader>
                {renderStep()}
            </DialogContent>
        </Dialog>
    )
}