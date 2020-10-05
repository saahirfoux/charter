import React, { useEffect, useState } from "react";
import { Table } from "../components";
import { Keys } from "../keys";

const Url = "https://code-challenge.spectrumtoolbox.com/api/restaurants";
const Options = {
    headers: {
        Authorization: Keys.restaurant
    }
};

export const Report = ({onSelectImage, onSelectDetails}) => {
    const [report, setReport] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const fetchData = async () => {
        const data = await fetch(Url, Options).then(response => response.json());
        data.sort((a,b) => {return a.name.localeCompare(b.name)})
        setReport(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchData()
    },[])

    if (isLoading) {
        return <h2>Loading, stand by. . .</h2>
    }
    
    return (
        <Table content={report} onSelectImage={onSelectImage} onSelectDetails={onSelectDetails}/>
    )
}