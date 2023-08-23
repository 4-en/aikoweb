import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { atom, useAtom } from "jotai";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-body">
        <p>Footer</p>
        <p>Some text...</p>
      </div>
    </div>
  );
};

export default Footer;