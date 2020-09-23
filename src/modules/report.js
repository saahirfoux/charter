import React, { useEffect, useState } from "react";
import { Table } from "../components";
import { Keys } from "../keys";

const Url = "https://code-challenge.spectrumtoolbox.com/api/restaurants";
const Options = {
    headers: {
        Authorization: Keys.restaurant
    }
};

export const Report = () => {
    let genreSet = new Set();
    const [report, setReport] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [genres, setGenres] = useState([]);


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
        <div>
            <Table content={report} />
        </div>
    )
}