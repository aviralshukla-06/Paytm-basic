import { useEffect, useState } from "react";
import axios from "axios";

const Balance = () => {
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(true);

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
            } finally {
                setLoading(false);
            }
        };

        fetchBalance();
    }, []);

    return (
        <div className="flex mt-4">
            <div className="font-bold text-lg">Your balance</div>
            <div className="font-semibold ml-4 text-lg">
                {loading ? "Loading..." : `Rs ${balance}`}
            </div>
        </div>
    );
};

export default Balance;
