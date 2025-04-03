import { FaAngleDoubleUp } from "react-icons/fa";
import { Link } from "react-scroll";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="relative">
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Contact />

      <Link to="navbar" smooth={true} duration={500}>
        <FaAngleDoubleUp className="fixed text-4xl right-4 bottom-4 cursor-pointer" />
      </Link>
    </div>
  );
}

export default App;
