import type { NextApiRequest, NextApiResponse } from "next";
import { PROJECTS } from "data/projects";

// The generic "Data" type does not match reality
// The type indicates we return { name: string } but we actually return a full project
type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // No HTTP method check
  // This function accepts GET, POST, PUT, DELETE... without distinction
  // SOLUTION: Add a check for req.method

  // req.query.id is not typed and parsing is not safe
  // req.query.id can be string | string[] | undefined
  // parseInt() can return NaN without validation
  const { id } = req.query;
  const project = PROJECTS.find((project) => project.id === parseInt(id));

  // No error handling if the project does not exist
  // If project is undefined, we return null instead of a 404 error
  // The return type does not match the declared Data type
  res.status(200).json(project);
}
