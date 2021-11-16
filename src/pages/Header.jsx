import React,{ useState } from 'react'
import {Link} from 'react-router-dom'
// import whiteSolgames from './../../assets/white-solgames.svg';
function Header(props) {
  const [isOpen, setIsOpen] = useState(false);

  const logoutHandler = () =>{
    if(window.solana){
      window.solana.disconnect();
    }
  }

  return (
    <div className="">
      <nav className=" w-full flex bg-transparent text-white backdrop-filter backdrop-blur-md bg-opacity-100 shadow-lg">
        <div className="flex max-w-7xl w-full lg:w-4/5 mx-auto px-6 py-3 sm:px-6 justify-between">
          
          <div className="flex items-center h-16">
            <div className="flex items-center">
              {/* {props.name && <Link to="/" className="">
                <img src={whiteSolgames} style={{width:"350px"}}></img>
              </Link>}
              {!props.name && <Link to="/" className="">
              <img src={whiteSolgames} style={{width:"350px"}}></img>
              </Link>} */}
              
            </div>
          </div>

          <div className="flex items-center h-16">
              <div className="hidden md:block flex">
                <div className="ml-10 flex justify-end">
                  
                  {props.name && <Link to="/viewnft">
                  <button className="text-heading-blue hover:bg-yellow-500 hover:shadow px-5 py-2 rounded-md text-md font-medium focus:outline-none ">
                    {props.name}
                  </button>
                  </Link>}

                  {!props.name && <Link to="/Roadmap">
                    <button className="px-4 text-heading-blue hover:bg-yellow-500 hover:shadow py-2 rounded-md text-md font-medium focus:outline-none ">
                      Roadmap
                    </button>
                  </Link>}

                  {props.name && 
                  <button  className="text-heading-blue hover:bg-yellow-500 hover:shadow px-8 py-2 rounded-md text-md font-medium focus:outline-none " onClick={logoutHandler}>
                    Logout
                  </button>
                  }

                  {!props.name && <Link to="/Login">
                  <button  className="text-heading-blue hover:bg-yellow-500 hover:shadow px-8 py-2 rounded-md text-md font-medium focus:outline-none ">
                    Login
                  </button>
                  </Link>}

                </div>
            </div>

            
          </div>
        </div>

        
            <div className="md:hidden" id="mobile-menu">
              <div className="flex flex-row px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  
                <Link to="/AboutUs">
                <button className="text-heading-blue hover:bg-yellow-500 hover:shadow px-5 py-2 rounded-md text-md font-medium focus:outline-none ">
                  About Us
                </button>
                </Link>
                
                <Link to="/Login">
                <button  className="text-heading-blue hover:bg-yellow-500 hover:shadow px-8 py-2 rounded-md text-md font-medium focus:outline-none ">
                  Login
                </button>
                </Link>

              </div>
            </div>
          
      </nav>
    </div>
  );
}

export default Header
