"use state";
import React, { useState, SetStateAction, Dispatch } from "react";
import Report from "./sections/report";
import Details from "./sections/details";

const Views = () => {
    // Explicitly type the state to allow number or null
    const [currentView, setCurrentView] = useState<number>(0);
    const [dataIndex, setDataIndex] = useState<number | null>(null);

    return (
        <>
            {currentView === 0 ? (
                <Report
                    dataIndex={dataIndex}
                    setCurrentView={setCurrentView as Dispatch<SetStateAction<number>>} // Cast or ensure type compatibility
                    setDataIndex={setDataIndex}
                />
            ) : (
                <Details dataIndex={dataIndex} setCurrentView={setCurrentView as Dispatch<SetStateAction<number>>} /> // Cast or ensure type compatibility
            )}
        </>
    );
};

export default Views;