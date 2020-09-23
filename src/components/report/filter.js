import React from "react";

export const Filter = ({content, controls, type, options, sFilter, gFilter}) => {

    const DefaultFilter = '';
    const SelectDropDown = ({content}) => {

        const handleChange = (e) => {
            gFilter(e.target.value);
        }

        return content.length > 0 ? (
            <select onChange={handleChange}>
                <option value={DefaultFilter}>All</option>
                {content.map(option => {
                    if (typeof option === 'object') {
                        return (
                            <option key={option.key} value={option.key}>{option.value}</option>
                        )
                    } else {
                        return (
                            <option key={option} value={option}>{option}</option>
                        )
                    }
                })}
            </select>
          ) : null;
    }

    return (
        <SelectDropDown content={content}/>
    )
    
};