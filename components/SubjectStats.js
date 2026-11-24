"use client";

import { useEffect, useState } from "react";
import { readJSON } from "@/lib/storage";
import { useFlags } from "@/lib/flags";

export default function SubjectStats({ slug }) {
  const { flags } = useFlags(slug);
  const [best, setBest] = useState(null);
  useEffect(() => setBest(readJSON(`reviewer:best:${slug}`, null)), [slug]);
  if (!best && !flags.length) return null;
  const parts = [];
  if (best) parts.push(`Best exam score ${best.pct}%`);
  if (flags.length) parts.push(`${flags.length} flagged`);
  return <p className="best">{parts.join(" · ")}</p>;
}
