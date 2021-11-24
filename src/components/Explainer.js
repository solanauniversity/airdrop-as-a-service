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
              Why we are building asa airdrop as a service!
            </h2>
            <p>
              What is the problem asa is aiming to solve.
              <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem modi asperiores autem expedita repudiandae, officia
              quibusdam laudantium veritatis minima, reiciendis ea deserunt
              perferendis provident, obcaecati distinctio dignissimos corporis
              non ab.
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
