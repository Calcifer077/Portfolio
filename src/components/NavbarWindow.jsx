// import { Link } from "react-scroll";
// import { RxCross2 } from "react-icons/rx";
// import { useVisibility } from "../context/VisibilityContext";

// function NavbarWindow() {
//   const { isVisible, dispatch } = useVisibility();

//   function handleChangeInVisibility() {
//     if (isVisible === true) {
//       dispatch({ type: "makeInVisible" });
//     }
//   }

//   if (isVisible) {
//     return (
//       <div className="pt-10 w-full relative">
//         <ul className="flex flex-col justify-center items-center gap-6">
//           <li className="cursor-pointer pb-1 hover:border-b-2 hover:border-black hover:text-gray-500 transition-all duration-150">
//             <Link
//               to="about"
//               smooth={true}
//               duration={500}
//               onClick={handleChangeInVisibility}
//             >
//               About
//             </Link>
//           </li>
//           <li className="cursor-pointer pb-1 hover:border-b-2 hover:border-black hover:text-gray-500 transition-all duration-150">
//             <Link
//               to="skills"
//               smooth={true}
//               duration={500}
//               onClick={handleChangeInVisibility}
//             >
//               Skills
//             </Link>
//           </li>

//           <li className="cursor-pointer pb-1 hover:border-b-2 hover:border-black hover:text-gray-500 transition-all duration-150">
//             <Link
//               to="projects"
//               smooth={true}
//               duration={500}
//               onClick={handleChangeInVisibility}
//             >
//               Projects
//             </Link>
//           </li>

//           <li className="cursor-pointer pb-1 hover:border-b-2 hover:border-black hover:text-gray-500 transition-all duration-150">
//             <Link
//               to="contact"
//               smooth={true}
//               duration={500}
//               onClick={handleChangeInVisibility}
//             >
//               Contact
//             </Link>
//           </li>
//         </ul>

//         <div className="absolute top-[-4px] right-2">
//           <RxCross2
//             className="text-5xl font-bold cursor-pointer mr-6"
//             onClick={handleChangeInVisibility}
//           />
//         </div>
//       </div>
//     );
//   }

//   return null;
// }

// export default NavbarWindow;

import { Link } from "react-scroll";
import { RxCross2 } from "react-icons/rx";
import { useVisibility } from "../context/VisibilityContext";

function NavbarWindow() {
  const { isVisible, dispatch } = useVisibility();

  function handleChangeInVisibility() {
    if (isVisible === true) {
      dispatch({ type: "makeInVisible" });
    }
  }

  if (isVisible) {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-opacity-10 bg-transparent backdrop-blur-lg flex justify-center items-center z-50">
        {/* Clickable overlay to close the menu */}
        <div
          className="absolute top-0 left-0 w-full h-full"
          onClick={handleChangeInVisibility}
        ></div>

        {/* Navbar Container */}
        <div className="bg-white shadow-lg p-8 rounded-lg relative w-4/5 max-w-md">
          <ul className="flex flex-col justify-center items-center gap-6">
            {["about", "skills", "projects", "contact"].map((item) => (
              <li
                key={item}
                className="cursor-pointer pb-1 hover:border-b-2 hover:border-black hover:text-gray-500 transition-all duration-150"
              >
                <Link
                  to={item}
                  smooth={true}
                  duration={500}
                  onClick={handleChangeInVisibility}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Link>
              </li>
            ))}
          </ul>

          {/* Close Button */}
          <div className="absolute top-2 right-2">
            <RxCross2
              className="text-3xl font-bold cursor-pointer transition-all duration-300 hover:text-gray-500 hover:rotate-90"
              onClick={handleChangeInVisibility}
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default NavbarWindow;
