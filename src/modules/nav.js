import React from "react";
import logo from '../assets/spectrumLogo.png'

export const Nav = () => {
    return (
        <header>
            <a href="/">
                <img alt="Spectrum" src={logo} />
            </a>
        </header>
    )
}