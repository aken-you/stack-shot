"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-2xl font-bold">
        1단계에서 기술 스택을 선택해주세요!
      </h1>

      <Button
        onClick={() => {
          router.push("/step/1");
          startTransition(() => {
            reset();
          });
        }}
      >
        1단계로 이동
      </Button>
    </div>
  );
}
