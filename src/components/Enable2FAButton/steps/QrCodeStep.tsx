import QrCode from "react-qr-code";
import { Button } from "../../ui/button";

interface QrCodeProps {
    value: string;
    setStep: React.Dispatch<React.SetStateAction<number>>;
}

export const QrCodeStep = ({ value, setStep }: QrCodeProps) => {
    return (
        <>
            <div className="flex items-center justify-center">
                <QrCode value={value} />
            </div>
            <Button type="button" className="hover:cursor-pointer" onClick={() => setStep(prev => prev + 1)}>Continue</Button>
        </>
    )
}