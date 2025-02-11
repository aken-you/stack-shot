import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StyleForm from "./_components/style-form";
import { cookies } from "next/headers";
import type { IconBoxStyleType, Theme } from "@/types/style";
import { INIT_ICON_BOX_STYLE } from "@/constants/step";

export default async function Page() {
  const cookieStore = await cookies();
  const iconBoxStyle = cookieStore.get("iconBoxStyle");
  const selectedTechs = cookieStore.get("techStack");
  const storedTheme = cookieStore.get("theme");

  if (!selectedTechs || JSON.parse(selectedTechs.value).length === 0) {
    throw new Error("select techs");
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Style Icon Box</CardTitle>
        <CardDescription>아이콘 박스의 스타일을 설정해주세요!</CardDescription>
      </CardHeader>

      <StyleForm
        initIconBoxStyle={
          iconBoxStyle
            ? (JSON.parse(iconBoxStyle.value) as IconBoxStyleType)
            : INIT_ICON_BOX_STYLE
        }
        selectedTechs={selectedTechs ? JSON.parse(selectedTechs.value) : []}
        selectedTheme={storedTheme ? (storedTheme.value as Theme) : "light"}
      />
    </>
  );
}
