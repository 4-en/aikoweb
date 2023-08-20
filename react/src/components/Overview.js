import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// the main page to display personal feed if logged in
// or some predefined feed if not logged in

function Overview() {
    return (
        <div className="overview-container">
            <div className="overview-header">
                <h1>Overview</h1>
            </div>
            <div className="overview-body">
                <p>Overview</p>
                <p>Some text...</p>
            </div>
        </div>
    )
};

export default Overview;