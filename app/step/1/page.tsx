import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TechForm from "./_components/tech-form";
import { cookies } from "next/headers";
import type { IconBoxStyleType, Theme } from "@/types/style";
import { INIT_ICON_BOX_STYLE } from "@/constants/step";

export const dynamic = "force-dynamic";

export default async function Page() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/icons`);
  const techs = await data.json();

  const cookieStore = await cookies();
  const initSelectedTechs = cookieStore.get("techStack");
  const selectedTheme = cookieStore.get("theme");
  const selectedIconBoxStyle = cookieStore.get("iconBoxStyle");
  const title = cookieStore.get("title");

  return (
    <>
      <CardHeader>
        <CardTitle>Select Tech Stack</CardTitle>
        <CardDescription>기술 스택을 선택해주세요!</CardDescription>
      </CardHeader>

      <TechForm
        techs={techs}
        initSelectedTechs={
          initSelectedTechs ? JSON.parse(initSelectedTechs.value) : []
        }
        selectedTheme={selectedTheme?.value as Theme}
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
