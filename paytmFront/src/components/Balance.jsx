import axios from "axios";

const Balance = ({ value }) => {

    const value = axios.get("http://localhost:3000/api/v1/user/")

    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {value}
        </div>
    </div>
}

export default Balance;