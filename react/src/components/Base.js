import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { atom, useAtom } from 'jotai'

import Navbar from './Navbar';
import Footer from './Footer';

// this component contains the navigation bar, the search bar, a footer and the child components

function Base(props) {
    return (
        <div className="base-container">
            <Navbar />
            <div className="base-body">
                {/* child components */}
                {props.children}
            </div>
            <Footer />
        </div>
    )
};

export default Base;