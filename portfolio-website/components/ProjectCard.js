export default function ProjectCard({ title, description, tags = [], link }) {
  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-500 text-sm mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-indigo-50 text-indigo-600 text-xs px-2 py-1 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 text-sm font-semibold hover:underline"
          >
            View Project &rarr;
          </a>
        )}
      </div>
    </article>
  );
}
