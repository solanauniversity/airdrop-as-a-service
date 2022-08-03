import { screen } from '@testing-library/dom';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function NewHeader() {
  const [offset, setOffset] = useState(0);
  const [screenWidth, setScreenWidth] = useState(1920);
  const [name, setName] = useState(
    '3yZSPESErfw2WoPZM1vg9jEfq8qUsnATqZFexnsVy5AG'
  );

  const formatPublicKey = (key) => {
    if (!key) {
      return;
    }
    const firstString = key.slice(0, 4);
    const secondString = key.slice(key.length - 6, key.length);
    return firstString + '....' + secondString;
  };

  useEffect(() => {
    window.onscroll = () => {
      setOffset(window.pageYOffset);
    };
    const width = window.innerWidth;
    setScreenWidth(width);
  }, []);

  const logoutHandler = () =>{
    window.solana?.disconnect();
  }

  return (
    <section className={`fixed-top navigation ${offset > 100 ? 'nav-bg' : ''}`}>
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light">
          <div className="navbar-brand">
            <Link to="/">
              <h2 class="logo-text">Solana University</h2>
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
              {/* <li class="nav-item">
                <Link to="/create">Create a token</Link>
              </li>

              <li class="nav-item">
                <Link to="/airdrop">Airdrop tokens</Link>
              </li> */}

              <li class="nav-item">
                <a
                  href="contact.html"
                  className="text-indigo-700 font-semibold"
                >
                  Welcome {formatPublicKey(name)}
                </a>
              </li>

              {/* <li class="nav-item">
                <a href="contact.html">{formatPublicKey(name)}</a>
              </li> */}
            </ul>
            <select className="px-3 bg-transparent border-2 rounded-lg border-gray-800 py-1 mr-3">
              <option>Devnet</option>
              <option>Mainnet(Beta)</option>
            </select>
            <a href="#" class="btn btn-primary ml-lg-3 primary-shadow" onClick={logoutHandler}>
              Logout
            </a>
          </div>
        </nav>
      </div>
    </section>
  );
}

export default NewHeader;
