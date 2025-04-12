import { useState } from "react"
import { Bottombar } from "../components/Bottombar"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { Inputbox } from "../components/Inputbox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"

export const Signup = () => {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"} />
                <SubHeading label={"Enter your infromation to create an account"} />
                <Inputbox onChange={e => {
                    setEmail(e.target.value)
                }} placeholder="harkirat@gmail.com" label={"Email"} />
                <Inputbox onChange={e => {
                    setUsername(e.target.value)
                }} placeholder="John" label={"Username"} />
                <Inputbox onChange={e => {
                    setPassword(e.target.value)
                }} placeholder="123456" label={"Password"} />
                <Inputbox onChange={e => {
                    setFirstName(e.target.value)
                }} placeholder="John" label={"First Name"} />
                <Inputbox onChange={e => {
                    setLastName(e.target.value)
                }} placeholder="Doe" label={"Last Name"} />
                <div className="pt-4">
                    <Button onClick={async () => {
                        try {
                            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                                email,
                                username,
                                password,
                                firstname,
                                lastname
                            });
                            console.log(response.data);
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

                    }} label={"Sign up"} />
                </div>
                <Bottombar label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
            </div>
        </div>
    </div>
}