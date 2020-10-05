import React, { useEffect, useState } from "react";
import { Search, Filter, Pagination } from "../../components";
import { states } from "./states"

/**
 * @summary unique child component of Table
 * @param {*} param
 */
function Body({content, onSelectDetails}) {
    const handleRowSelection = (restaurant) => {
        onSelectDetails(restaurant);
    }
    return content.length > 0 ? (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Telephone</th>
                    <th>Genre</th>
                </tr>
            </thead>
            <tbody>
                {content.map(restaurant => {
                    return (
                        <tr key={restaurant.id} onClick={() => handleRowSelection(restaurant)}>
                            <td>{restaurant.name}</td>
                            <td>{restaurant.city}</td>
                            <td>{restaurant.state}</td>
                            <td>{restaurant.telephone}</td>
                            <td>{restaurant.genre}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
      ) : <h2>No results were found</h2>;
}

/**
 * @summary scans each row, splits & stores each into a set to quickly gather distinct values 
 * @param {*} content 
 * @returns [] Array
 */
function createGenresList(content) {
    let genreSet = new Set();
    content.forEach((row) => {
        row.genre.split(',').forEach((genre) => {
            genreSet.add(genre)
        });
    });
    return Array.from(genreSet)
}

/**
 * @summary scans each row, splits & stores each into a set to quickly gather distinct values 
 * @param {*} content 
 * @returns [] Array
 */
function createAttireList(content) {
    let attireSet = new Set();
    content.forEach((row) => {
        attireSet.add(row.attire)
    });
    return Array.from(attireSet)
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

export const Table = ({content, onSelectImage, onSelectDetails}) => {
    const genres = createGenresList(content)
    const attire = createAttireList(content)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState([0, 10])
    const [stateFilter, setStateFilter] = useState('')
    const [genreFilter, setGenreFilter] = useState('')
    const [attireFilter, setAttireFilter] = useState('')
    const [filteredRestaurants, setFilteredRestaurants] = useState([])
    const [isFilterActive, setFilterStatus] = useState(true)
    let filterStatusText = isFilterActive ? "Disable Filters" : "Enable Filters"

    useEffect(() => {
        setFilteredRestaurants(content.filter( restaurant => {
            let {name,city,state,genre, attire} = restaurant;
            if (isFilterActive) {
                if (!state.includes(stateFilter)) {
                    return false
                }

                if (!genre.includes(genreFilter)) {
                    return false
                }

                if (!attire.includes(attireFilter)) {
                    return false
                }
            }

            return (name + city + genre).toLowerCase().includes(search.toLowerCase())
        }))
        // reset pagination
        setPage([0, 10]);

        onSelectImage(Math.floor(Math.random() * 11))
    }, [search, stateFilter, genreFilter, attireFilter, isFilterActive, content])

    const paginate = (content) => {
        return content.length > 0 ? content.slice(page[0], page[1]) : content
    }

    const handleFilterStatus = () => {
        setFilterStatus(!isFilterActive);
    }

    return (
        <div className="table__container">
            <Search controls={getControlObj(search, setSearch)}/>
            <div className="filter__container">
                <div className="filter__group">
                    <Filter content={states} controls={getControlObj(stateFilter, setStateFilter)}/>
                    <Filter content={genres} controls={getControlObj(genreFilter, setGenreFilter)}/>
                    <Filter content={attire} controls={getControlObj(attireFilter, setAttireFilter)}/>
                </div>
                <div className="filter__control">
                    <span onClick={handleFilterStatus}>{filterStatusText}</span>
                </div>
            </div>
            <Body content={paginate(filteredRestaurants)} onSelectDetails={onSelectDetails}/>
            <Pagination content={filteredRestaurants} controls={getControlObj(page, setPage)}/>
        </div>
    )
};