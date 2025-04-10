

import { Bottombar } from "../components/Bottombar"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { Inputbox } from "../components/Inputbox"
import { SubHeading } from "../components/SubHeading"

export const Signin = () => {

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign in"} />
                <SubHeading label={"Enter your credentials to access your account"} />
                <Inputbox placeholder="example@gmail.com" label={"Email"} />
                <Inputbox placeholder="123456" label={"Password"} />
                <div className="pt-4">
                    <Button label={"Sign in"} />
                </div>
                <Bottombar label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
            </div>
        </div>
    </div>
}