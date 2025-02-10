import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TitleForm from "./_components/title-form";
import { cookies } from "next/headers";
import type { IconBoxStyleType, Theme } from "@/types/style";
import { INIT_ICON_BOX_STYLE } from "@/constants/step";

export default async function Step4() {
  const cookieStore = await cookies();
  const initTitle = cookieStore.get("title");
  const selectedTechs = cookieStore.get("techStack");
  const selectedTheme = cookieStore.get("theme");
  const selectedIconBoxStyle = cookieStore.get("iconBoxStyle");

  return (
    <>
      <CardHeader>
        <CardTitle>Set Title</CardTitle>
        <CardDescription>타이틀을 설정해주세요!</CardDescription>
      </CardHeader>

      <TitleForm
        initTitle={initTitle?.value || ""}
        selectedTechs={selectedTechs ? JSON.parse(selectedTechs.value) : []}
        selectedTheme={selectedTheme ? (selectedTheme.value as Theme) : "light"}
        selectedIconBoxStyle={
          selectedIconBoxStyle
            ? (JSON.parse(selectedIconBoxStyle.value) as IconBoxStyleType)
            : INIT_ICON_BOX_STYLE
        }
      />
    </>
  );
}
