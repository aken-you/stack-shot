import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TitleForm from "./_components/title-form";

export default function Step4() {
  return (
    <>
      <CardHeader>
        <CardTitle>Set Title</CardTitle>
        <CardDescription>타이틀을 설정해주세요!</CardDescription>
      </CardHeader>

      <TitleForm />
    </>
  );
}
