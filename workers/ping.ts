import { Queue, Worker } from "bullmq";
import { getRedisConnection } from "./getRedisConnection";

export function start() {
  try {
    const queue = new Queue("pings", {
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
      },
      connection: getRedisConnection(), // Redis hardcoded in getRedisConnection.ts
    });

    queue.add(
      "pings",
      {
        frequency: 1,
      },
      {
        repeat: { pattern: "*/20 * * * * *" }, // Ping every 20s instead of the expected 2 minutes
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
          const response = await fetch("http://localhost:3000/api/projects"); // URL hardcoded, not using .env and config.ts
          const data = await response.json();

          for (const project of data) {
            const response = await fetch(project.url); // Sequential calls, risk of overload for 20k projects

            if (response.status === 200) {
              // =====
              // No need to review this part
              console.log("Ok");
              // =====
            }
          }

          // Use Promise.allSettled() + batch processing (e.g., by 100)
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
