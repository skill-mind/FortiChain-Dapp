"use client";

import React, { useState, SetStateAction, Dispatch } from "react";
import Report from "./sections/report";
import Details from "./sections/details";

const Views = () => {
    const [currentView, setCurrentView] = useState<number>(0);
    const [dataIndex, setDataIndex] = useState<number | null>(null);

    return (
        <>
            {currentView === 0 ? (
                <Report
                    dataIndex={dataIndex}
                    setCurrentView={setCurrentView as Dispatch<SetStateAction<number>>}
                    setDataIndex={setDataIndex}
                />
            ) : (
                <Details dataIndex={dataIndex} setCurrentView={setCurrentView as Dispatch<SetStateAction<number>>} />
            )}
        </>
    );
};

export default Views;