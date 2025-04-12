

import { useState } from "react"
import { Bottombar } from "../components/Bottombar"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { Inputbox } from "../components/Inputbox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"

export const Signin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign in"} />
                <SubHeading label={"Enter your credentials to access your account"} />
                <Inputbox onChange={e => {
                    setEmail(e.target.value)
                }} placeholder="example@gmail.com" label={"Email"} />
                <Inputbox onChange={e => {
                    setPassword(e.target.value)
                }} placeholder="123456" label={"Password"} />
                <div className="pt-4">
                    <Button onClick={async () => {
                        try {
                            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                                email,
                                password,
                            });
                            console.log(response.data);
                            localStorage.setItem("token", response.data.token)
                        } catch (error) {
                            console.error("Axios error:", error.message);
                            if (error.response) {
                                console.error("Server responded with:", error.response.data);
                            } else if (error.request) {
                                console.error("No response received:", error.request);
                            } else {
                                console.error("Axios setup error:", error.message);
                            }
                        }
                    }} label={"Sign in"} />
                </div>
                <Bottombar label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
            </div>
        </div>
    </div>
}



//vhiruibjh@gmail.com
//ijlk[peg6848995