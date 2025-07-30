import type { NextApiRequest, NextApiResponse } from "next";
import { PROJECTS } from "data/projects";

// Completely incorrect type
// The Data type indicates we return { name: string }
// But we actually return an array of full projects
type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // No HTTP method check at all
  // This API accepts GET, POST, PUT, DELETE without distinction
  // Risk of unwanted and unhandled calls

  // This line simulates database retrieval.
  const projects = PROJECTS;
  /**
   * The database code is:
   * await prisma.project.findMany()
   */

  // Catastrophic performance
  // Returns 20,000 projects at once without pagination
  // Overloads client + server + network
  // No error handling
  // Incorrect return type
  // TypeScript should throw an error because projects[] ≠ Data
  res.status(200).json(projects);
}
