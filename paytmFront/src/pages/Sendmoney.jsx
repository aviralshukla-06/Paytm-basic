import { useNavigate, useSearchParams } from "react-router-dom"
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";


export const Sendmoney = () => {

    const [searchParams] = useSearchParams();
    const userName = searchParams.get("username");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const [balance, setBalance] = useState(null);
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/payment/checkbal", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });

                setBalance(response.data.balance);
            } catch (err) {
                console.error("Error fetching balance:", err);
                setBalance("Error");
            }
        };

        fetchBalance();
    }, []);

    const handleAmountChange = (e) => {
        const value = Number(e.target.value);
        setAmount(value);

        if (balance !== null && value > balance) {
            setErrorMsg("Insufficient balance.");
        } else {
            setErrorMsg("");
        }
    };

    // console.log(balance);

    return <div class="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div
                class="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
            >
                <div class="flex flex-col space-y-1.5 p-6">
                    <h2 class="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div class="p-6">
                    <div class="flex items-center space-x-4">
                        <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                            <span class="text-2xl text-white">{name[0].toUpperCase()}</span>
                        </div>
                        <h3 class="text-2xl font-semibold">{name}</h3>
                    </div>
                    <div class="space-y-4">
                        <div class="space-y-2">
                            <label
                                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                for="amount"
                            >
                                Amount (in Rs.)
                            </label>
                            <input
                                onChange={handleAmountChange}
                                type="number"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                id="amount"
                                placeholder="Enter amount"
                            />
                            {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
                        </div>


                        <button onClick={() => {
                            axios.post("http://localhost:3000/api/v1/payment/transfer", {
                                amount,
                                username: userName
                            }, {
                                headers: {
                                    Authorization: "Bearer " + localStorage.getItem("token")
                                }
                            })

                            navigate("/paymentcomplete");

                        }} class="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                            Initiate Transfer
                        </button>

                    </div>
                </div>
            </div>
        </div>
    </div>
}