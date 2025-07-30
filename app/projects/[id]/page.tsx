"use client";
import { Tag } from "components/Tag";
import { useEffect, useState } from "react";

export default function Home({ params }: { params: any }) {
  const [project, setProject] = useState<{
    id: number;
    name: string;
    description: string;
    tags: string[];
  } | null>(null);

  function getProject() {
    fetch(`http://localhost:3000/api/projects/${params.id}`).then((response) =>
      response.json().then((data) => {
        setProject(data);
      })
    );
  }

  useEffect(() => {
    getProject();
  }, []);

  if (!project) return <div>Loading...</div>;

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
