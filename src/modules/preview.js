import React from "react";
const bkgrdImgs = ["one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve"];

export const Preview = ({onSelectImage, onSelectDetails}) => {
    const baseClassName = "preview__container ";

    return onSelectDetails === {} ? (<></>) : (
        <div className={baseClassName + bkgrdImgs[onSelectImage]}>
            <div className="preview__card">
                <h3>{onSelectDetails.name}</h3>
                <p>{onSelectDetails.telephone}</p>
                <p><a rel="noopener noreferrer" href={onSelectDetails.website} target="_blank">{onSelectDetails.website}</a></p>
            </div>
        </div>
    )
}