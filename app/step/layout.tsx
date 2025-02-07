import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import StepProgressBar from "./_component/step-progress-bar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto max-w-4xl overflow-x-auto px-4 py-10">
      <StepProgressBar />
      <Card className="space-y-6 p-6">{children}</Card>
    </div>
  );
}
