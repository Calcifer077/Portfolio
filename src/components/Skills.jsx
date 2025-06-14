import { FaCircleCheck } from "react-icons/fa6";
import ScrollIntoView from "./ScrollIntoView";

function Skills() {
  return (
    <ScrollIntoView comeFrom="bottom" id="skills">
      <div className="text-center p-10">
        <div className="font-semibold text-xl text-gray-500">Explore My</div>
        <div className="font-bold text-5xl tracking-wide">Skills</div>
      </div>

      {/* Skills sections start here */}
      <div className="flex flex-col min-[870px]:flex-row items-center justify-center gap-12 md:gap-6 xl:gap-16">
        {/* Frontend skills start here */}
        <ScrollIntoView
          comeFrom="left"
          className="border-2 border-gray-500 p-4 pl-6 rounded-4xl w-96 h-96 bg-gray-50"
        >
          <div className="text-center font-bold text-3xl text-gray-700 mb-6">
            Frontend Development
          </div>
          <div className="grid grid-cols-2">
            <div className="flex items-center gap-4 p-2">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg"
                height="25px"
                width="25px"
              />

              <div>
                <div className="font-bold">HTML</div>
                <div>Intermediate</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-2">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg"
                height="25px"
                width="25px"
              />

              <div>
                <div className="font-bold">CSS</div>
                <div>Intermediate</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-2">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"
                height="25px"
                width="25px"
              />

              <div>
                <div className="font-bold">Javascript</div>
                <div>Intermediate</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-2">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
                height="25px"
                width="25px"
              />

              <div>
                <div className="font-bold">React JS</div>
                <div>Intermediate</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-2">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
                height="25px"
                width="25px"
              />

              <div>
                <div className="font-bold">Tailwind CSS</div>
                <div>Basic</div>
              </div>
            </div>
          </div>
        </ScrollIntoView>
        {/* Frontend skills ends here */}

        {/* Backend skills start here */}
        <ScrollIntoView
          comeFrom="right"
          className="border-2 border-gray-500 p-4 pl-6 rounded-4xl w-96 h-96 bg-gray-50"
        >
          <div className="text-center font-bold text-3xl text-gray-700 mb-6">
            Backend Development
          </div>
          <div className="grid grid-cols-2">
            <div className="flex items-center gap-4 p-2">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
                height="25px"
                width="25px"
              />

              <div>
                <div className="font-bold">Node JS</div>
                <div>Intermediate</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-2">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg"
                height="25px"
                width="25px"
              />

              <div>
                <div className="font-bold">Express JS</div>
                <div>Intermediate</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-2">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg"
                height="25px"
                width="25px"
              />

              <div>
                <div className="font-bold">MongoDB</div>
                <div>Intermediate</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-2">
              <FaCircleCheck className="text-2xl" />
              <div>
                <div className="font-bold">JWT</div>
                <div>Intermediate</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-2">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
                height="25px"
                width="25px"
              />

              <div>
                <div className="font-bold">Github</div>
                <div>Basic</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-2">
              <FaCircleCheck className="text-2xl" />
              <div>
                <div className="font-bold">Rest APIs</div>
                <div>Intermediate</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-2">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg"
                height="25px"
                width="25px"
              />
              <div>
                <div className="font-bold">Supabase</div>
                <div>Basic</div>
              </div>
            </div>
          </div>
        </ScrollIntoView>
        {/* Backend skills start here */}
      </div>
    </ScrollIntoView>
  );
}

export default Skills;
