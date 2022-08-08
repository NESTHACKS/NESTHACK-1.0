import React from "react";
import Hero from "../components/Hero";
import MarketsTable from "../components/MarketsTable";

const Homepage = ({ connectWallet }) => {
    return (
        <div className="p-4 bg-[#011936] flex-1 h-full">
            <Hero connectWallet={connectWallet} />
            <MarketsTable />
        </div>
    );
};

export default Homepage;
