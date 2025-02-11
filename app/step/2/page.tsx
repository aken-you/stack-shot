import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ThemeForm from "./_components/theme-form";
import { cookies } from "next/headers";
import type { IconBoxStyleType, Theme } from "@/types/style";
import { INIT_ICON_BOX_STYLE } from "@/constants/step";

export default async function Page() {
  const cookieStore = await cookies();
  const initSelectedTheme = cookieStore.get("theme");
  const selectedTechs = cookieStore.get("techStack");
  const selectedIconBoxStyle = cookieStore.get("iconBoxStyle");
  const title = cookieStore.get("title");

  if (!selectedTechs || JSON.parse(selectedTechs.value).length === 0) {
    throw new Error("select techs");
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Select Theme</CardTitle>
        <CardDescription>이미지 테마를 선택해주세요!</CardDescription>
      </CardHeader>

      <ThemeForm
        selectedTechs={selectedTechs ? JSON.parse(selectedTechs.value) : []}
        initSelectedTheme={
          initSelectedTheme ? (initSelectedTheme.value as Theme) : "light"
        }
        selectedIconBoxStyle={
          selectedIconBoxStyle
            ? (JSON.parse(selectedIconBoxStyle.value) as IconBoxStyleType)
            : INIT_ICON_BOX_STYLE
        }
        title={title?.value}
      />
    </>
  );
}
