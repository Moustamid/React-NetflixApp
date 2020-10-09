import React, { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  // States :
  const [handleShow, sethandleShow] = useState(false);
  // Hooks :
  useEffect(() => {
    // effect
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        sethandleShow(true);
      } else sethandleShow(false);
    });

    return () => {
      // cleanUp :
      window.removeEventListener("scroll");
    };
  }, []);

  // Helper functions :

  return (
    <div className={`nav ${handleShow ? "handleShow" : ""}`}>
      <img
        className="nav__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Logo_Netflix.png"
        alt="Netflix Logo"
      />
      <img
        className="nav__avatar"
        src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
        alt="Netflix Logo"
      ></img>
    </div>
  );
};

export default Navbar;
