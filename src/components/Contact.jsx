import { IoMdMail } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import ScrollIntoView from "./ScrollIntoView";

function Contact() {
  function handleMailClick() {
    window.open(
      "mailto:maheshnashier14@gmail.com",
      "_blank",
      "noopener,noreferrer"
    );
  }

  function handleLinkedinClick() {
    window.open(
      "https://www.linkedin.com/in/mahesh-nashier-b05691249/",
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <ScrollIntoView comeFrom="bottom" className="pb-20 p-4" id="contact">
      <div className="w-full text-center tracking-wide pt-16">
        <div className="font-semibold text-2xl text-gray-500 xs:text-lg xs:text-gray-50">
          Get in Touch
        </div>
        <div className="font-bold text-5xl sm:text-3xl">Contact Me</div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8 border-2 border-gray-500 p-8 md:p-10 rounded-3xl max-w-4xl mx-auto xl:gap-16">
        <div
          className="flex gap-4 items-center cursor-pointer"
          onClick={handleMailClick}
        >
          <IoMdMail className="text-4xl md:text-5xl" />
          <div className="text-xl md:text-3xl font-semibold hover:text-gray-300 hover:border-b-2 hover:pb-2 transition-all duration-200">
            Maheshnashier@gmail.com
          </div>
        </div>
        <div
          className="flex gap-4 items-center cursor-pointer"
          onClick={handleLinkedinClick}
        >
          <FaLinkedin className="text-4xl md:text-5xl" />
          <div className="text-xl md:text-3xl font-semibold hover:text-gray-300 hover:border-b-2 hover:pb-2 transition-all duration-200">
            Linkedin
          </div>
        </div>
      </div>
    </ScrollIntoView>
  );
}

export default Contact;
