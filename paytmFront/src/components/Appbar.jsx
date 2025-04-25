
import { useEffect, useState } from "react";
import axios from "axios";

const Appbar = () => {

    const [firstName, setFirstName] = useState("")

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/dashboard")
            .then(response => {

                setFirstName(response.data.firstname || "");
            })
            .catch(err => {
                console.error("Failed to fetch user info", err);
            });
    }, []);

    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            PayTM App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello, {firstName}
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {firstName?.[0]?.toUpperCase() ?? ""}
                </div>
            </div>
        </div>
    </div>
}

export default Appbar;