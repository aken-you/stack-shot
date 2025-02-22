import type { IconBoxStyleType, Theme } from "@/types/style";
import { INIT_ICON_BOX_STYLE } from "@/constants/step";

interface SessionData {
  techStack: string[];
  theme: Theme;
  iconBoxStyle: IconBoxStyleType;
  title: string;
}

export default function useSessionFormData(): SessionData {
  const session = {
    techStack:
      typeof window !== "undefined"
        ? sessionStorage.getItem("techStack")
        : null,
    theme:
      typeof window !== "undefined" ? sessionStorage.getItem("theme") : null,
    iconBoxStyle:
      typeof window !== "undefined"
        ? sessionStorage.getItem("iconBoxStyle")
        : null,
    title:
      typeof window !== "undefined" ? sessionStorage.getItem("title") : null,
  };

  const techStack = session.techStack
    ? (JSON.parse(session.techStack) as string[])
    : [];
  const theme = session.theme ? (session.theme as Theme) : "light";
  const iconBoxStyle = session.iconBoxStyle
    ? (JSON.parse(session.iconBoxStyle) as IconBoxStyleType)
    : INIT_ICON_BOX_STYLE;
  const title = session.title || "";

  return { techStack, theme, iconBoxStyle, title };
}
