import React from 'react'

interface Props {
    dataIndex: number | null;
    setCurrentView: (view: number) => void;
}

const Details: React.FC<Props> = ({ dataIndex, setCurrentView }) => {
    const handleBackToReport = () => {
        setCurrentView(0);
    };

    return (
        <div>
            <h2>Details View</h2>
        </div>
    );
};

export default Details;