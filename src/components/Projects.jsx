import ProjectCard from "./ProjectCard";
import ScrollIntoView from "./ScrollIntoView";

const projects = [
  {
    id: "1",
    name: "The Wild Oasis",
    description: "A web-application for managing hotel",
    githubLink: "https://github.com/Calcifer077/the-wild-oasis",
    image: "the-wild-oasis.png",
  },
  {
    id: "2",
    name: "Natours",
    description: "A simple tour booking application",
    githubLink: "https://github.com/Calcifer077/natours",
    image: "natours.png",
  },
  {
    id: "3",
    name: "Blogger",
    description: "Blogging application",
    githubLink: "https://github.com/Calcifer077/blog-application-react",
    image: "blogger.png",
  },
  {
    id: "4",
    name: "Moviesite",
    description: "Movie Review application",
    githubLink: "https://github.com/Calcifer077/Movie-website",
    image: "moviesite.png",
  },
  {
    id: "5",
    name: "Proxy-server",
    description: "A Proxy server with caching functionality",
    githubLink: "https://github.com/Calcifer077/proxy-server-caching",
    image: "proxy-server.png",
  },
  {
    id: "6",
    name: "Fast-pizza",
    description: "Pizza ordering application",
    githubLink: "https://github.com/Calcifer077/fast-pizza",
    image: "fast-pizza.png",
  },
  {
    id: "7",
    name: "Forkify",
    description: "Application to look up recipes accross the internet",
    githubLink: "https://github.com/Calcifer077/Forkify",
    image: "forkify.png",
  },
];

function Projects() {
  return (
    <ScrollIntoView comeFrom="bottom" id="projects" className="p-10">
      <div className="text-center pb-20">
        <div className="font-semibold text-lg md:text-xl text-gray-500">
          Browse My
        </div>
        <div className="font-bold text-3xl md:text-5xl tracking-wide">
          Recent Projects
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 w-full max-w-6xl mx-auto">
        {projects.map((el) => (
          <ProjectCard
            key={el.id}
            name={el.name}
            description={el.description}
            githubLink={el.githubLink}
            image={el.image}
          />
        ))}
      </div>
    </ScrollIntoView>
  );
}

export default Projects;
