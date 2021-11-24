import React from 'react';
import Footer from '../components/Footer';
import NewHeader from '../components/NewHeader';
import excel from '../assets/excel.svg';

function AirdropToken() {
  return (
    <div>
      <NewHeader />
      <section class="section-lg seo">
        <div class="container">
          <div>
            <h1 className="text-center text-4xl text-indigo-800">
              Airdropping coins is now as simple as sipping coffee
            </h1>
            <p
              className="text-center font-semibold mt-3 text-3xl
            "
            >
              Follow the below simple steps
            </p>
          </div>
          <div className="flex justify-around items-center flex-wrap mt-4">
            <div className="relative grid place-items-center w-80 bg-white  px-3 py-3 rounded-xl shadow-2xl border-2 border-indigo-300">
              <div className="absolute top-1 left-2">
                <h2 className="opacity-10">01</h2>
              </div>
              <div className="bg-indigo-600 rounded-full w-16 h-16 grid place-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="white"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M17 7a8.003 8.003 0 0 0-7.493 5.19l1.874.703A6.002 6.002 0 0 1 23 15a6 6 0 0 1-6 6H7A6 6 0 0 1 5.008 9.339a7 7 0 0 1 13.757-2.143A8.027 8.027 0 0 0 17 7z" />
                </svg>
              </div>
              <div>
                <p
                  className="text-center leading-8"
                  style={{ fontSize: '15px' }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tempore dolores.
                </p>
              </div>
            </div>
            <div className="relative grid place-items-center w-80 bg-white  px-3 py-3 rounded-xl shadow-2xl border-2 border-indigo-300">
              <div className="absolute top-1 left-2">
                <h2 className="opacity-10">02</h2>
              </div>
              <div className="bg-indigo-600 rounded-full w-16 h-16 grid place-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="white"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M17 7a8.003 8.003 0 0 0-7.493 5.19l1.874.703A6.002 6.002 0 0 1 23 15a6 6 0 0 1-6 6H7A6 6 0 0 1 5.008 9.339a7 7 0 0 1 13.757-2.143A8.027 8.027 0 0 0 17 7z" />
                </svg>
              </div>
              <div>
                <p
                  className="text-center leading-8"
                  style={{ fontSize: '15px' }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tempore dolores.
                </p>
              </div>
            </div>
            <div className="relative     grid place-items-center w-80 bg-white  px-3 py-3 rounded-xl shadow-2xl border-2 border-indigo-300">
              <div className="absolute top-1 left-2">
                <h2 className="opacity-10">03</h2>
              </div>
              <div className="bg-indigo-600 rounded-full w-16 h-16 grid place-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="white"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M17 7a8.003 8.003 0 0 0-7.493 5.19l1.874.703A6.002 6.002 0 0 1 23 15a6 6 0 0 1-6 6H7A6 6 0 0 1 5.008 9.339a7 7 0 0 1 13.757-2.143A8.027 8.027 0 0 0 17 7z" />
                </svg>
              </div>
              <div>
                <p
                  className="text-center leading-8"
                  style={{ fontSize: '15px' }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tempore dolores.
                </p>
              </div>
            </div>
            <div className="relative grid place-items-center w-80 bg-white  px-3 py-3 rounded-xl shadow-2xl border-2 border-indigo-300">
              <div className="absolute top-1 left-2">
                <h2 className="opacity-10">04</h2>
              </div>
              <div className="bg-indigo-600 rounded-full w-16 h-16 grid place-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="white"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M17 7a8.003 8.003 0 0 0-7.493 5.19l1.874.703A6.002 6.002 0 0 1 23 15a6 6 0 0 1-6 6H7A6 6 0 0 1 5.008 9.339a7 7 0 0 1 13.757-2.143A8.027 8.027 0 0 0 17 7z" />
                </svg>
              </div>
              <div>
                <p
                  className="text-center leading-8"
                  style={{ fontSize: '15px' }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tempore dolores. Download sample{' '}
                  <a href="" className="text-indigo-700 font-bold">
                    here
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="grid place-items-center mt-8">
            <div className="border-2 border-indigo-400 w-auto h-auto rounded-3xl shadow-2xl ">
              <form
                action=""
                className="flex justify-center items-center w-full"
              >
                <div className="py-10 px-20">
                  <label htmlFor="mint" className="font-semibold text-xl">
                    Mint key of the token
                  </label>
                  <br />
                  <input
                    type="text"
                    placeholder="mint-name"
                    id="mint"
                    className="rounded-lg  px-2 py-3 input-box"
                  />
                  <br />
                  <label htmlFor="mint" className="font-semibold text-xl mt-4">
                    Denomination of token
                  </label>
                  <br />
                  <input
                    type="text"
                    placeholder="mint-name"
                    id="mint"
                    className="rounded-lg px-2 py-3 input-box"
                  />
                  <br />
                  <label
                    htmlFor="chooseFile"
                    className="font-semibold text-xl mt-4"
                  >
                    Choose an excel file
                  </label>
                  <div className="h-36 rounded-lg grid place-items-center chooseFile-box">
                    <img src={excel} alt="" className="h-16 w-16" />
                    <p>Drag or choose an excel file</p>
                    <input type="file" id="chooseFile" className="ml-60" />
                  </div>
                  <button
                    type="button"
                    className="bg-indigo-600 text-white font-semibold px-8 py-2 rounded-lg mt-4 ml-auto"
                  >
                    Submit
                  </button>
                </div>
              </form>
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
      <Footer />
    </div>
  );
}

export default AirdropToken;
