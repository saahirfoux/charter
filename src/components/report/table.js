import React, { useEffect, useState } from "react";
import { Search, Filter } from "../../components";
import { states } from "./states"

/**
 * @summary unique child component of Table
 * @param {*} param
 */
function Body({content}) {
    return content.length > 0 ? (
        <table>
          {content.map(restaurant => {
            return (
                <tr key={restaurant.id}>
                    <td>{restaurant.name}</td>
                    <td>{restaurant.city}</td>
                    <td>{restaurant.state}</td>
                    <td>{restaurant.telephone}</td>
                    <td>{restaurant.genre}</td>
                </tr>
            );
          })}
        </table>
      ) : null;
}

/**
 * @summary scans each row, splits & stores each into a set to quickly gather distinct values 
 * @param {*} content 
 * @returns [] Array
 */
function collectGenres(content) {
    let genreSet = new Set();
    content.forEach((row) => {
        row.genre.split(',').forEach((genre) => {
            genreSet.add(genre)
        });
    });
    return Array.from(genreSet)
}

/**
 * @summary a helper function to efficient pass hooks to child.
 * @param {*} val 
 * @param {*} control
 * @param {*} extension
 * @returns { } object
 */
function getControlObj(val, control, extension) {
    extension = extension ? extension : {}
    const controlObj = {
        value: val,
        set: control
    }
    return {
        ...controlObj,
        ...extension
    }
}

export const Table = ({content}) => {
    const genres = collectGenres(content)
    const [search, setSearch] = useState('')
    const [filteredRestaurants, setFilteredRestaurants] = useState([])

    useEffect(() => {
        setFilteredRestaurants(content.filter( restaurant => {
            let {name,city,state,telephone,genre} = restaurant;
            return new String(name + city + state + telephone + genre).toLowerCase().includes(search.toLowerCase())
        }))
    }, [search])

    return (
        <div>
            <Search controls={getControlObj(search, setSearch)}/>
            <Filter content={states} controls={getControlObj(filteredRestaurants, setFilteredRestaurants)}/>
            <Filter content={genres} controls={getControlObj(filteredRestaurants, setFilteredRestaurants)}/>

            <Body content={filteredRestaurants}/>
        </div>
    )
};