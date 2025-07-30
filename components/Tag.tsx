"use client";
import { getColorByTag } from "helpers/getColorByTag";
import Link from "next/link"; // Unused import, should block the build in a strict TypeScript configuration

export function Tag({ tag }: { tag: string }) {
  const color = getColorByTag(tag); // Called on every render, even if the tag does not change

  return (
    <div
      className={`rounded inline-flex text-white px-2`}
      style={{
        backgroundColor: color,
      }}
    >
      {tag}
    </div>
  );
}
