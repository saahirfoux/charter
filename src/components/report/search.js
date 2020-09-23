import React, { useState } from "react";

export const Search = ({controls}) => {
    let [searchInput, setSearchInput] = useState("")

    const handleSubmit = () => {
        controls.set(searchInput);
    }
    const handleCancel = () => {
        setSearchInput("");
        searchInput = "";
        controls.set(searchInput);
    }
    
    return (
        <div className="search__container">
            <input
                className="search__form"
                type="text"
                placeholder="Search"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
            />
            <i></i>
            <button onClick={handleSubmit}>Ok</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    )
};