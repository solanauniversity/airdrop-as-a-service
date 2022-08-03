import React from 'react';

function Features() {
  return (
    <section class="section feature mb-0" id="feature">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center">
            <h2 class="section-title">University has following features to offer</h2>
            <p class="mb-100">
              Each feature is a production ready feature, which can be used for free.
              Airdrop as a service offers two exclusive features which are not
              yet there on the market.
            </p>
          </div>
          {/* <!-- feature item --> */}
          <div class="grid place-items-center">
            <div class="d-flex feature-item hover:scale-105">
              <div className="grid place-items-center border border-gray-900 w-96 bg-white px-10 py-10 rounded-lg shadow-xl mr-10 ">
                <div className="">
                  <div className="feature-icon ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="40"
                      height="40"
                      fill="white"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M7.941 18c-.297-1.273-1.637-2.314-2.187-3a8 8 0 1 1 12.49.002c-.55.685-1.888 1.726-2.185 2.998H7.94zM16 20v1a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-1h8zm-3-9.995V6l-4.5 6.005H11v4l4.5-6H13z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="text-center mt-4">Create a custom SPL token</h4>
                  <p className="mt-2 text-center">
                    This feature allows you to create your own <strong>custom SPL</strong> token
                  </p>
                </div>
              </div>
              <div className="grid place-items-center border border-gray-900 w-96 bg-white px-10 py-10 rounded-lg shadow-xl">
                <div>
                  <div className="feature-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="40"
                      height="40"
                      fill="white"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M7.941 18c-.297-1.273-1.637-2.314-2.187-3a8 8 0 1 1 12.49.002c-.55.685-1.888 1.726-2.185 2.998H7.94zM16 20v1a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-1h8zm-3-9.995V6l-4.5 6.005H11v4l4.5-6H13z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="text-center mt-4">Airdrop as a service</h4>
                  <p className="mt-2 text-center">
                    This feature offers you to do the <strong>airdrop</strong> of your custom SPL token.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- feature item --> */}
        </div>
      </div>
      <img
        class="feature-bg-1 up-down-animation"
        src="images/background-shape/feature-bg-1.png"
        alt="bg-shape"
      />
      <img
        class="feature-bg-2 left-right-animation"
        src="images/background-shape/feature-bg-2.png"
        alt="bg-shape"
      />
    </section>
  );
}

export default Features;
