import ProjectCard from "./ProjectCard";

const projects = [
  {
    id: "1",
    name: "Natours",
    description: "A simple tour booking application",
    githubLink: "https://github.com/Calcifer077/natours",
    image: "natours.png",
  },
  {
    id: "2",
    name: "Blogger",
    description: "Blogging application",
    githubLink: "https://github.com/Calcifer077/blog-application-react",
    image: "blogger.png",
  },
  {
    id: "3",
    name: "Moviesite",
    description: "Movie Review application",
    githubLink: "https://github.com/Calcifer077/Movie-website",
    image: "moviesite.png",
  },
  {
    id: "4",
    name: "Proxy-server",
    description: "A Proxy server with caching functionality",
    githubLink: "https://github.com/Calcifer077/proxy-server-caching",
    image: "proxy-server.png",
  },
  {
    id: "5",
    name: "Fast-pizza",
    description: "Pizza ordering application",
    githubLink: "https://github.com/Calcifer077/fast-pizza",
    image: "fast-pizza.png",
  },
  {
    id: "6",
    name: "Forkify",
    description: "Application to look up recipes accross the internet",
    githubLink: "https://github.com/Calcifer077/Forkify",
    image: "forkify.png",
  },
];

function Projects() {
  return (
    <div id="projects" className="p-10">
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
    </div>
  );
}

export default Projects;
