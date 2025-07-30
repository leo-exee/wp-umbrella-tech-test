import type { NextApiRequest, NextApiResponse } from "next";
import { PROJECTS } from "data/projects";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // This line simulates database retrieval.
  const projects = PROJECTS;
  /**
   * The database code is:
   * await prisma.project.findMany()
   */

  res.status(200).json(projects);
}
