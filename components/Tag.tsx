"use client";
import { getColorByTag } from "helpers/getColorByTag";
import Link from "next/link";

export function Tag({ tag }: { tag: string }) {
  const color = getColorByTag(tag);
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
