import logo from "../assets/logo.png";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from "../hooks/useMobile";
import {BsCart4} from 'react-icons/bs'


const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const navigate = useNavigate() ; 

  const isSearchPage = location.pathname === "/search";

  const redirectToLoginPage =() => {
    navigate('/login')
  }

  // console.log("isMobile: ", isMobile);
  // console.log("location: ", location);
  // console.log("isSearchPage: ", isSearchPage);

  return (
    <header className="h-24 lg:h-20 shadow-md sticky top-0 bg-red-500 flex flex-col justify-center gap-1 bg-white ">
      {!(isSearchPage && isMobile) && (
        <div className="coantainer mx-auto flex items-center px-2 justify-between">
          {/* Logo */}

          <div className="h-full">
            <Link to={"/"} className="h-full flex justify-center items-center">
              <img
                src={logo}
                width={170}
                height={60}
                alt="logo"
                className="hidden lg:block"
              />
              <img
                src={logo}
                width={120}
                height={60}
                alt="logo"
                className="lg:hidden"
              />
            </Link>
          </div>

          {/* Search */}

          <div className="hidden lg:block">
            <Search />
          </div>

          {/* Login + Add to Cart */}

          <div className="">

          {/* User icons display in only mobile version */}
          
            <button className="text-neutral-600 lg:hidden ">
              <FaRegCircleUser size={26} />
            </button>

            {/* Desktop*/}

            <div className="hidden lg:flex items-center gap-10 ">
              
              <button onClick={redirectToLoginPage} 
              className="text-lg px-2 "
              >Login</button>

              <button className="flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-3 rounded text-white " >

                {/* Add to Cart icon */}

                <div className="animate-bounce" >
                  <BsCart4 size={26} />
                </div>
                <div className="font-semibold" >
                  <p>My Cart</p>
                </div>

              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-2 lg:hidden ">
        <Search />
      </div>
    </header>
  );
};

export default Header;
