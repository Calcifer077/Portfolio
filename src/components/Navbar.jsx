import { Link } from "react-scroll";
import { FaAlignJustify } from "react-icons/fa";
import { useVisibility } from "../context/VisibilityContext";

import NavbarWindow from "./NavbarWindow";

function Navbar() {
  const { isVisible, dispatch } = useVisibility();

  function handleChangeInVisibility() {
    if (isVisible === false) {
      dispatch({ type: "makeVisible" });
    }
  }

  return (
    <div
      className="flex flex-col md:flex-row justify-between font-bold text-2xl tracking-wide pt-10 relative"
      id="navbar"
    >
      <div className="w-full text-center md:text-left md:ml-20">
        Mahesh Portfolio
      </div>
      <div>
        <ul className="md:flex space-x-12 mr-20 hidden">
          <li className="cursor-pointer pb-1 hover:border-b-2 hover:border-black hover:text-gray-500 transition-all duration-150">
            <Link to="about" smooth={true} duration={500}>
              About
            </Link>
          </li>
          <li className="cursor-pointer pb-1 hover:border-b-2 hover:border-black hover:text-gray-500 transition-all duration-150">
            <Link to="skills" smooth={true} duration={500}>
              Skills
            </Link>
          </li>
          <li className="cursor-pointer pb-1 hover:border-b-2 hover:border-black hover:text-gray-500 transition-all duration-150">
            <Link to="projects" smooth={true} duration={500}>
              Projects
            </Link>
          </li>
          <li className="cursor-pointer pb-1 hover:border-b-2 hover:border-black hover:text-gray-500 transition-all duration-150">
            <Link to="contact" smooth={true} duration={500}>
              Contact
            </Link>
          </li>
        </ul>
      </div>

      <div className="md:hidden">
        {isVisible && <NavbarWindow className="w-full" />}
        {!isVisible && (
          <div className="absolute top-10 right-2">
            <FaAlignJustify
              className="text-4xl font-bold cursor-pointer mr-6 "
              onClick={handleChangeInVisibility}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
