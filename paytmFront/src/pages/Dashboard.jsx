// frontend/src/pages/Dashboard.jsx

import React from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Appbar />

            <div className="p-4">
                <Balance />

                <div className="mt-6">
                    <Users />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
