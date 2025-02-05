import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto flex max-w-4xl flex-col items-center gap-4 overflow-x-auto px-5 py-10">
      {children}
    </div>
  );
}
