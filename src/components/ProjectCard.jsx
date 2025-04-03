function ProjectCard({ name, description, githubLink, image }) {
  function redirect() {
    window.open(githubLink, "_blank", "noopener,noreferrer");
  }

  return (
    <div
      className="cursor-pointer text-center w-full max-w-md border-2 rounded-4xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 mx-auto"
      onClick={redirect}
    >
      <img
        src={image}
        alt={name}
        className="w-full h-60 object-cover rounded-t-3xl"
      />
      <div className="p-6">
        <div className="font-bold text-2xl mb-2">{name}</div>
        <p className="text-gray-600 text-lg mb-4">{description}</p>
        <button className="bg-gray-700 text-white px-6 py-2 rounded-full hover:bg-gray-500 transition-all duration-200">
          View on GitHub
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;
