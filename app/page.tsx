import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex flex-col items-center px-8 pb-8">
      <section className="flex w-full max-w-screen-lg flex-col items-center pb-36 pt-48">
        <h1 className="text-5xl font-bold text-blue-800">
          개발 스택을 한눈에 👀
        </h1>
        <p className="pt-3 text-2xl text-gray-600">
          사용하는 기술 스택을 한눈에 볼 수 있는 이미지를 만들어보세요🔥
        </p>
      </section>

      <Link
        href="step/1"
        className={cn(
          buttonVariants({ variant: "default" }),
          "rounded-3xl px-10 py-8 text-xl font-semibold shadow-xl hover:scale-110 focus:scale-110",
        )}
      >
        지금 시작하기 🚀
      </Link>
    </div>
  );
}
