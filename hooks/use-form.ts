import { INIT_ICON_BOX_STYLE } from "@/constants/step";
import type { IconBoxStyleType, Theme } from "@/types/style";
import { useEffect, useState } from "react";

export default function useForm() {
  const [techStack, setTechStack] = useState<string[]>([]); // 1단계 입력
  const [theme, setTheme] = useState<Theme>("light"); // 2단계 선택
  const [iconBoxStyle, setIconBoxStyle] = useState<IconBoxStyleType>({
    backgroundColor: "",
    borderColor: "",
    borderRadius: "",
    boxShadow: "",
  }); // 3단계 입력
  const [title, setTitle] = useState<string>(""); // 4단계 입력

  const [isInitialized, setIsInitialized] = useState<boolean>(true);

  // session storage로부터 데이터를 가져와서 초기화해야 함
  useEffect(() => {
    const isBrowser = typeof window !== "undefined";

    if (!isBrowser) return;

    const session = {
      techStack: sessionStorage.getItem("techStack"),
      theme: sessionStorage.getItem("theme"),
      iconBoxStyle: sessionStorage.getItem("iconBoxStyle"),
      title: sessionStorage.getItem("title"),
    };

    setTechStack(session.techStack ? JSON.parse(session.techStack) : []);
    setTheme(session.theme ? (session.theme as Theme) : "light");
    setIconBoxStyle(
      session.iconBoxStyle
        ? JSON.parse(session.iconBoxStyle)
        : INIT_ICON_BOX_STYLE,
    );
    setTitle(session.title ? session.title : "");

    setIsInitialized(false);
  }, []);

  return {
    isInitialized,
    techStack,
    setTechStack,
    theme,
    setTheme,
    iconBoxStyle,
    setIconBoxStyle,
    title,
    setTitle,
  };
}
