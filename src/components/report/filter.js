import React, { useEffect, useState } from "react";

export const Filter = ({content, controls}) => {
    const [selected, setSelected] = useState('');
    const handleChange = (e) => {
        setSelected(e.target.value);
    }
    useEffect(() => {
        controls.set(selected)
    }, [selected])

    return content.length > 0 ? (
        <select onChange={handleChange} value={selected}>
            <option value={''}>All</option>
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
};