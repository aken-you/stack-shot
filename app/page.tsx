import Image from "next/image";
import Link from "next/link";
import logoImg from "./icon.svg";

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex w-full items-center justify-center px-4 py-4">
        <div className="flex w-full max-w-screen-xl items-center justify-between">
          <div className="flex items-center gap-1">
            <Image
              src={logoImg}
              alt="dev-stack-view-logo"
              width="36"
              height="36"
            />
            <span className="text-base font-extrabold text-gray-700">
              dev-stack-view
            </span>
          </div>
        </div>
      </header>

      <main className="flex grow flex-col items-center">
        <section className="flex w-full max-w-screen-lg flex-col items-center px-8 pb-36 pt-48">
          <h1 className="text-5xl font-bold text-blue-800">
            개발 스택을 한눈에 👀
          </h1>
          <p className="pt-3 text-2xl text-gray-600">
            사용하는 기술 스택을 한눈에 볼 수 있는 이미지를 만들어보세요🔥
          </p>
        </section>

        <Link
          href="step1"
          className="transform rounded-3xl bg-blue-500 px-10 py-4 text-xl font-semibold text-white shadow-xl transition-colors transition-transform hover:scale-110 hover:bg-blue-700 focus:scale-110"
        >
          지금 시작하기 🚀
        </Link>
      </main>
    </div>
  );
}
