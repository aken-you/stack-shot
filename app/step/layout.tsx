"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { STEPS } from "@/constants/step";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const currentStep = Number(pathname.at(-1));

  return (
    <div className="container mx-auto max-w-4xl overflow-x-auto px-4 py-10">
      <nav className="mb-10">
        <div className="mb-2 flex justify-between">
          {STEPS.map((step) => (
            <Link key={step.path} href={step.path} className="flex-1 px-1">
              <div
                className={`h-1.5 rounded-full transition-colors ${Number(step.path.at(-1)) <= currentStep ? "bg-blue-500" : "bg-zinc-200"}`}
              />
            </Link>
          ))}
        </div>
      </nav>
      <Card className="space-y-6 p-6">{children}</Card>
    </div>
  );
}
