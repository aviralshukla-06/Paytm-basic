import doneVideo from "../media/done.mp4";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const PaymentComplete = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/dashboard")
        }, 5000)

        return () => clearTimeout(timer);
    }, [navigate])
    return (
        <div className="flex justify-center h-screen bg-gray-100">
            <div className="h-full flex flex-col justify-center">
                <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="text-3xl font-bold text-center">Payment Status</h2>
                    </div>
                    <div className="flex flex-col items-center">
                        <video width="300" autoPlay muted loop className="mb-4 rounded-md">
                            <source src={doneVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <div className="text-black text-4xl text-center mb-[100px]">Done</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
