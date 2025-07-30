import { Queue, Worker } from "bullmq";
import { getRedisConnection } from "./getRedisConnection";

export function start() {
  try {
    const queue = new Queue("pings", {
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
      },
      connection: getRedisConnection(),
    });

    queue.add(
      "pings",
      {
        frequency: 1,
      },
      {
        repeat: { pattern: "*/20 * * * * *" },
      }
    );
  } catch (error) {
    console.log("error", error);
  }

  try {
    const worker = new Worker(
      "pings",
      async (job) => {
        try {
          const response = await fetch("http://localhost:3000/api/projects");
          const data = await response.json();

          for (const project of data) {
            const response = await fetch(project.url);

            if (response.status === 200) {
              // =====
              // No need to review this part
              console.log("Ok");
              // =====
            }
          }
        } catch (error) {
          // =====
          // No need to review this part
          // =====
        }
      },
      {
        connection: getRedisConnection(),
      }
    );
  } catch (error) {
    console.log(error);
  }
}

start();
