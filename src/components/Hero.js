import React from 'react';
import solanaLogo from '../assets/solana.png';

function Hero() {
  return (
    <section
      class="hero-section hero"
      data-background=""
      style={{ 'background-image': 'url(images/hero-area/banner-bg.png)' }}
    >
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center zindex-1">
            <h1 class="mb-3">
              Airdrop
              <br />
              as a service
            </h1>
            <p class="mb-4">
              Now do hassle free aidrops conveniently
              <br />
              without worrying about to setup the system we take care of that
            </p>
            <div className="flex items-center justify-center">
              <p className="mr-4">Powered by</p>
              <div className="flex justify-center items-center">
                <img
                  src={solanaLogo}
                  alt=""
                  className="w-36 h-8 object-cover rounded-full"
                />
              </div>
            </div>
            <a href="#" className="btn btn-secondary btn-lg mt-10">
              Login
            </a>
          </div>
        </div>
      </div>

      <div id="scene">
        <img
          class="img-fluid hero-bg-1 up-down-animation"
          src="images/background-shape/feature-bg-2.png"
          alt=""
        />
        <img
          class="img-fluid hero-bg-2 left-right-animation"
          src="images/background-shape/seo-ball-1.png"
          alt=""
        />
        <img
          class="img-fluid hero-bg-3 left-right-animation"
          src="images/background-shape/seo-half-cycle.png"
          alt=""
        />
        <img
          class="img-fluid hero-bg-4 up-down-animation"
          src="images/background-shape/green-dot.png"
          alt=""
        />
        <img
          class="img-fluid hero-bg-5 left-right-animation"
          src="images/background-shape/blue-half-cycle.png"
          alt=""
        />
        <img
          class="img-fluid hero-bg-6 up-down-animation"
          src="images/background-shape/seo-ball-1.png"
          alt=""
        />
        <img
          class="img-fluid hero-bg-7 left-right-animation"
          src="images/background-shape/yellow-triangle.png"
          alt=""
        />
        <img
          class="img-fluid hero-bg-8 up-down-animation"
          src="images/background-shape/service-half-cycle.png"
          alt=""
        />
        <img
          class="img-fluid hero-bg-9 up-down-animation"
          src="images/background-shape/team-bg-triangle.png"
          alt=""
        />
      </div>
    </section>
  );
}

export default Hero;
