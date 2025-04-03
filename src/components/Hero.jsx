// import { FaGithub, FaLinkedin } from "react-icons/fa";

// function Hero() {
//   return (
//     <div
//       className="flex flex-col lg:flex-row justify-between text-2xl tracking-wide m-10 mx-w-md"
//       id="about"
//     >
//       {/* Left Section with Image */}
//       <div className="w-1/2 flex justify-center items-center mx-auto lg:ml-26">
//         <img
//           src="profile-pic.png"
//           className="w-[300px] h-[300px] object-cover rounded-full border-2 border-gray-400"
//           alt="Profile"
//         />
//       </div>

//       {/* Right Section with Text */}
//       <div className="w-full lg:w-1/2 flex flex-col justify-center mx-auto text-center xl:pr-20 pt-10 lg:pt-0">
//         <div className="text-lg">Hello, I'm</div>
//         <div className="font-bold text-5xl tracking-wider pt-2">Mahesh</div>
//         <div className="text-3xl tracking-wider pt-2">FullStack Developer</div>

//         {/* Buttons start here */}
//         {/* <div className="flex justify-between gap-8 text-lg mt-8">
//           <button className="border-2 p-2 font-[600] w-50 border-gray-500 rounded-4xl hover:bg-gray-900 hover:text-gray-50 transition-all duration-150 cursor-pointer">
//             Download Resume
//           </button>
//           <button className="border-2 p-2 font-[600] w-50 border-gray-500 rounded-4xl bg-gray-900 text-gray-100 hover:bg-gray-100 hover:text-gray-900 transition-all duration-150 cursor-pointer">
//             Contact Info
//           </button>
//         </div> */}

//         <div className="flex flex-col lg:flex-row justify-between items-center gap-8 text-lg mt-8">
//           <button className="border w-8/10 h-full md:w-7/10 border-gray-500 text-gray-700 py-2 px-6 rounded-full hover:bg-gray-700 hover:text-gray-100 transition-all duration-300 cursor-pointer">
//             Download Resume
//           </button>
//           <button className="border w-8/10 h-full md:w-7/10 border-gray-500 text-white py-2 px-6 rounded-full bg-gray-900 hover:bg-gray-700 transition-all duration-300 cursor-pointer">
//             Contact Info
//           </button>
//         </div>
//         {/* Buttons ends here */}

//         {/* Social Links start here */}
//         <div className="flex justify-center gap-6 mt-8">
//           <a
//             href="https://github.com/Calcifer077"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-4xl text-gray-900 hover:text-gray-900 transition-colors duration-150"
//           >
//             <FaGithub />
//           </a>
//           <a
//             href="https://www.linkedin.com/in/mahesh-nashier-b05691249/"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-4xl text-gray-900 hover:text-blue-700 transition-colors duration-150"
//           >
//             <FaLinkedin />
//           </a>
//         </div>
//         {/* Social Links ends here */}
//       </div>
//     </div>
//   );
// }

// export default Hero;

import { FaGithub, FaLinkedin } from "react-icons/fa";

function Hero() {
  return (
    <div
      className="flex flex-col xl:flex-row justify-around gap-2 text-2xl tracking-wide m-10 max-w-7xl mx-auto"
      id="about"
    >
      {/* Left Section with Image */}
      <div className="w-full xl:w-1/2 flex justify-center items-center xl:justify-start mx-auto xl:ml-26">
        <img
          src="profile-pic.png"
          className="w-[250px] h-[250px] xl:w-[350px] xl:h-[350px] object-cover rounded-full border-2 border-gray-400"
          alt="Profile"
        />
      </div>

      {/* Right Section with Text */}
      <div className="w-full xl:w-1/2 flex flex-col justify-center items-center mx-auto text-center xl:text-left xl:pr-20 pt-10 xl:pt-0">
        <div className="text-lg">Hello, I'm</div>
        <div className="font-bold text-5xl xl:text-6xl tracking-wider pt-2">
          Mahesh
        </div>
        <div className="text-3xl xl:text-4xl tracking-wider pt-2">
          FullStack Developer
        </div>

        {/* Buttons */}
        {/* <div className="flex flex-col xl:flex-row justify-center xl:justify-start items-center gap-6 text-lg mt-8 w-full">
          <button className="border w-8/10 xl:w-1/2 h-full border-gray-500 text-gray-700 py-3 px-6 rounded-full hover:bg-gray-700 hover:text-gray-100 transition-all duration-300 cursor-pointer">
            Download Resume
          </button>
          <button className="border w-8/10 xl:w-1/2 h-full border-gray-500 text-white py-3 px-6 rounded-full bg-gray-900 hover:bg-gray-700 transition-all duration-300 cursor-pointer">
            Contact Info
          </button>
        </div> */}

        <div className="flex flex-col xl:flex-row justify-center xl:justify-start items-center gap-6 text-lg mt-8 w-full">
          <button
            onClick={() => {
              const link = document.createElement("a");
              link.href = "Resume.pdf";
              link.download = "My_Resume.pdf";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="border w-8/10 xl:w-1/2 h-full border-gray-500 text-gray-700 py-3 px-6 rounded-full hover:bg-gray-700 hover:text-gray-100 transition-all duration-300 cursor-pointer"
          >
            Download Resume
          </button>

          <button className="border w-8/10 xl:w-1/2 h-full border-gray-500 text-white py-3 px-6 rounded-full bg-gray-900 hover:bg-gray-700 transition-all duration-300 cursor-pointer">
            Contact Info
          </button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center xl:justify-start gap-6 mt-8">
          <a
            href="https://github.com/Calcifer077"
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl text-gray-900 hover:text-gray-700 transition-colors duration-150"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/mahesh-nashier-b05691249/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl text-gray-900 hover:text-blue-700 transition-colors duration-150"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Hero;
