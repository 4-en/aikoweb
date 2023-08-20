import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Navbar() {
    return (
        <div className="navbar-container">
            <div className="navbar-header">
                <h1>Navbar</h1>
            </div>
            <div className="navbar-body">
                <p>Navbar</p>
                <p>Some text...</p>
            </div>
        </div>
    )
};

export default Navbar;