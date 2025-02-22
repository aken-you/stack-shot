import type { IconBoxStyleType, Theme } from "@/types/style";
import { INIT_ICON_BOX_STYLE } from "@/constants/step";

interface FormData {
  techStack: string[];
  theme: Theme;
  iconBoxStyle: IconBoxStyleType;
  title: string;
}

export default function useSessionFormData(): FormData {
  const isBrowser = typeof window !== "undefined";

  const session = {
    techStack: isBrowser ? sessionStorage.getItem("techStack") : null,
    theme: isBrowser ? sessionStorage.getItem("theme") : null,
    iconBoxStyle: isBrowser ? sessionStorage.getItem("iconBoxStyle") : null,
    title: isBrowser ? sessionStorage.getItem("title") : null,
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
