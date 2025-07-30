"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Tag } from "./Tag";

export function Projects() {
  // Missing typing: the projects state is initialized with an empty array,
  // An interface Project should be defined to ensure data structure.
  const [projects, setProjects] = useState([]);

  // Fetch call without error handling or try/catch => risk of silent errors.
  // Hardcoded API URL, making it hard to change between dev and prod. Not deployable in prod.
  const getProjects = () => {
    fetch("http://localhost:3000/api/projects").then((response) =>
      response.json().then((data) => {
        setProjects(data);
      })
    );
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div className="space-y-2">
      {/* No stable unique key for the list. */}
      {projects.map((project) => (
        <div key={project.id} className="rounded p-2 bg-white">
          <div className="flex items-center gap-2">
            {/* No memoization to avoid unnecessary recalculation of tags */}
            {project.tags.map((tag, key) => {
              return <Tag tag={tag} key={key} />;
            })}
          </div>
          <p>
            (Id: {project.id}) Name: {project.name}
          </p>
          <Link href={`/projects/${project.id}`} className="underline">
            View project detail
          </Link>
        </div>
      ))}
    </div>
  );
}
