import React, {useEffect, useState} from "react";

export const Pagination = ({content, controls}) => {
    const MaxVisibleRecords = 10;
    const MaxPage = Math.ceil(content.length / MaxVisibleRecords);
    let [currentPage, setCurrentPage] = useState(1);
    let [opacityClass, setOpacityClass] = useState('pagination__start');

    const handlePrevious = () => {
        let start = 0;
        let end = MaxVisibleRecords;
        if (currentPage > 1 ) {
            setCurrentPage(currentPage - 1)
            if (currentPage - 1 !== 1) {    
                for (let x = 0; x < currentPage - 1; x++ ) {
                    start += MaxVisibleRecords;
                    end += MaxVisibleRecords;
                }
            }
    
            controls.set([start,end]);
        }
    }
    const handleNext = () => {
        let start = 0;
        let end = MaxVisibleRecords;
        if (currentPage < MaxPage ) {
            setCurrentPage(currentPage + 1)

            for (let x = 0; x < currentPage; x++ ) {
                start += MaxVisibleRecords;
                end += MaxVisibleRecords;
            }
    
            end = end > content.length ? content.length : end;

            controls.set([start,end]);
        }
    }

    // reset current page to 1 when a new filter is changed
    useEffect(() => {
        if (controls.value[0] === 0) {
            setCurrentPage(1)
        }
    }, [controls.value])

    // show / hide the start / end buttons based on currentPage
    useEffect(() => {
        setOpacityClass('');
        if (currentPage === 1) {
            setOpacityClass('pagination__start');
        }
        if (currentPage === MaxPage) {
            setOpacityClass('pagination__end');
        }
    }, [currentPage, MaxPage])

    return (
        <div className={"pagination__container " + opacityClass}>
            <button onClick={handlePrevious}>Prev</button>
            <span className="pagination__index">Page {currentPage} of {MaxPage}</span>
            <button onClick={handleNext}>Next</button>
        </div>
    )
};