"use client";

import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
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
    // Log the error
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <CardHeader>
        <CardTitle>1단계에서 기술 스택을 선택해주세요!</CardTitle>
      </CardHeader>

      <Button
        onClick={() => {
          router.push("/step/1");

          startTransition(() => {
            reset();
          });
        }}
      >
        1단계로 돌아가기
      </Button>
    </div>
  );
}
