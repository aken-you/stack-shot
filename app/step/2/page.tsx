import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ThemeForm from "./_components/theme-form";

export default function Page() {
  return (
    <>
      <CardHeader>
        <CardTitle>Select Theme</CardTitle>
        <CardDescription>이미지 테마를 선택해주세요!</CardDescription>
      </CardHeader>

      <ThemeForm />
    </>
  );
}
