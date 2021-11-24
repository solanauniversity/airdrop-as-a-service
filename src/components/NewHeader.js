import { screen } from '@testing-library/dom';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function NewHeader() {
  const [offset, setOffset] = useState(0);
  const [screenWidth, setScreenWidth] = useState(1920);

  useEffect(() => {
    window.onscroll = () => {
      setOffset(window.pageYOffset);
    };
    const width = window.innerWidth;
    setScreenWidth(width);
  }, []);

  return (
    <section className={`fixed-top navigation ${offset > 200 ? 'nav-bg' : ''}`}>
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light">
          <div className="navbar-brand">
            <Link to="/">
              <h1 class="logo-text">Airdrop</h1>
            </Link>
          </div>
          <button
            class="navbar-toggler border-0"
            type="button"
            data-toggle="collapse"
            data-target="#navbar"
            aria-controls="navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse text-center" id="navbar">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <Link to="/create">Create a token</Link>
              </li>

              <li class="nav-item">
                <Link to="/airdrop">Airdrop tokens</Link>
              </li>

              <li class="nav-item">
                <a href="contact.html">Contact</a>
              </li>
            </ul>
            <a href="#" class="btn btn-primary ml-lg-3 primary-shadow">
              Login
            </a>
          </div>
        </nav>
      </div>
    </section>
  );
}

export default NewHeader;
