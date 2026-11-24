import Link from "next/link";
import { Backdrop } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="app-main" data-tint="home">
      <Backdrop />
      <main className="shell">
        <h1 className="large-title">Page not found</h1>
        <p className="lede">That page doesn&apos;t exist. Go back to the subjects to keep reviewing.</p>
        <a className="btn btn-primary" href="/">
          Go to subjects
        </a>
      </main>
    </div>
  );
}
