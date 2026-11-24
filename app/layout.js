import "./globals.css";
import { themeBootScript } from "@/lib/themeScript";

export const metadata = {
  title: {
    default: "Final Exam Reviewer",
    template: "%s · Final Exam Reviewer",
  },
  description:
    "Final exam reviewer for Advanced Java Programming (IT1908) and Data Structures (IT2503): notes, flashcards, review mode and exam mode built from the Prelim, Midterm and Prefinal exams plus the final topics.",
  appleWebApp: { capable: true, title: "Reviewer", statusBarStyle: "black-translucent" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#efeaff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0820" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
