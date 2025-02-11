import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-3.75rem)] flex-col items-center justify-center gap-6 px-8 py-8">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Not Found</h1>
        <p className="text-m text-neutral-500 dark:text-neutral-400">
          존재하지 않는 페이지입니다.
        </p>
      </div>

      <Link className={cn(buttonVariants({ variant: "default" }))} href="/">
        메인 페이지로
      </Link>
    </div>
  );
}
