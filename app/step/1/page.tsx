import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Step1Page from "./_components/step1-page";

export const dynamic = "force-dynamic";

export default async function Page() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/icons`);
  const techs = await data.json();

  return (
    <>
      <CardHeader>
        <CardTitle>Select Tech Stack</CardTitle>
        <CardDescription>기술 스택을 선택해주세요!</CardDescription>
      </CardHeader>

      <Step1Page techs={techs} />
    </>
  );
}
