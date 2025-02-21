import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StyleForm from "./_components/style-form";

export default function Page() {
  return (
    <>
      <CardHeader>
        <CardTitle>Style Icon Box</CardTitle>
        <CardDescription>아이콘 박스의 스타일을 설정해주세요!</CardDescription>
      </CardHeader>

      <StyleForm />
    </>
  );
}
