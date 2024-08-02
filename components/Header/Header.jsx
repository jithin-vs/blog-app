import React from "react";

const Header = () => {
  return (
    <header className="header-container">
      <div className="logo">Landie</div>
      <nav className="top-nav">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Products</a>
        <a href="#">Contact</a>
        <a href="#">
          <button className="buy-button">Buy now</button>
        </a>
      </nav>
    </header>
  );
};

export default Header;
