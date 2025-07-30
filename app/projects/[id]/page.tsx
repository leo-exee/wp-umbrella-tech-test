"use client";
import { Tag } from "components/Tag";
import { useEffect, useState } from "react";

// Weak typing, should be replaced by an interface
export default function Home({ params }: { params: any }) {
  // Weak typing, should be replaced by an interface
  const [project, setProject] = useState<{
    id: number;
    name: string;
    description: string;
    tags: string[];
  } | null>(null);

  function getProject() {
    fetch(`http://localhost:3000/api/projects/${params.id}`) // Hardcoded URL, should be extracted to a config file + .env
      .then((response) =>
        response.json().then((data) => {
          setProject(data); // No try/catch in case JSON is invalid or empty
        })
      );
  }

  useEffect(() => {
    getProject(); // Direct call on mount without error handling, should add `loading` and `error` state management
  }, []);

  if (!project) return <div>Loading...</div>; // Loading is too basic, poor UX, no error display if fetch fails

  return (
    <div className="bg-slate-50 p-4 w-full h-full">
      <h1 className="text-3xl font-bold mb-8">Project: {project.name}</h1>
      <div className="flex items-center gap-2">
        {project.tags.map((tag, key) => {
          return <Tag tag={tag} key={key} />;
        })}
      </div>
      <p>Id: {project.id}</p>
      <p>{project.description}</p>
    </div>
  );
}
