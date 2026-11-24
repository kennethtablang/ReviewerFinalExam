import { notFound } from "next/navigation";
import { subjects, getSubject } from "@/lib/subjects";
import NavBar from "@/components/NavBar";
import TabBar from "@/components/TabBar";
import { Backdrop } from "@/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return subjects.map((s) => ({ subject: s.slug }));
}

export async function generateMetadata({ params }) {
  const { subject } = await params;
  const s = getSubject(subject);
  return s ? { title: { default: s.title, template: `%s · ${s.short}` } } : {};
}

export default async function SubjectLayout({ children, params }) {
  const { subject } = await params;
  const s = getSubject(subject);
  if (!s) notFound();
  return (
    <div className="app-main" data-tint={s.slug === "java" ? "java" : "ds"}>
      <Backdrop />
      <NavBar title={s.short} />
      <main className="shell">{children}</main>
      <TabBar slug={s.slug} />
    </div>
  );
}
