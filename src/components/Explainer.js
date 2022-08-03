import React from 'react';
import problemIllustration from '../assets/problemil.svg';

function Explainer() {
  return (
    <section class="section-lg seo">
      <div class="container">
        <div class="row flex items-center">
          <div class="col-md-6">
            <div class="seo-image">
              <img class="img-fluid" src={problemIllustration} alt="form-img" />
            </div>
          </div>
          <div class="col-md-5">
            <h2 class="section-title">
              Why Solana University need to exists ? 
            </h2>
            <p>
              With the growth of new web3 developers, everyone is 
              learning and consuming content from multiple platforms.
              <br></br>
              <a target="_blank" href="https://www.questbook.app" style={{color:"blue"}} >Questbook</a> is one of the platform where new devs are learning and giving shape to their ideas.

              <br></br>
              Hence to see all the tutorials in action is never easy, here "Solana University" comes to the rescue.
            </p>
          </div>
        </div>
      </div>
      {/* <!-- background image --> */}
      <img
        class="img-fluid seo-bg"
        src="images/backgrounds/seo-bg.png"
        alt="seo-bg"
      />
      {/* <!-- background-shape --> */}
      <img
        class="seo-bg-shape-1 left-right-animation"
        src="images/background-shape/seo-ball-1.png"
        alt="bg-shape"
      />
      <img
        class="seo-bg-shape-2 up-down-animation"
        src="images/background-shape/seo-half-cycle.png"
        alt="bg-shape"
      />
      <img
        class="seo-bg-shape-3 left-right-animation"
        src="images/background-shape/seo-ball-2.png"
        alt="bg-shape"
      />
    </section>
  );
}

export default Explainer;
