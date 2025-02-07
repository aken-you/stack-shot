"use client";

import { usePathname } from "next/navigation";
import { STEPS } from "@/constants/step";

export default function StepProgressBar() {
  const pathname = usePathname();
  const currentStep = Number(pathname.at(-1));

  return (
    <nav className="mb-10">
      <div className="mb-2 flex justify-between space-x-2">
        {STEPS.map((step) => (
          <div
            key={step.path}
            className={`h-1.5 flex-1 rounded-full px-1 transition-colors ${Number(step.path.at(-1)) <= currentStep ? "bg-blue-500" : "bg-zinc-200"}`}
          />
        ))}
      </div>
    </nav>
  );
}
