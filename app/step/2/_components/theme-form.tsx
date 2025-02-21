"use client";

import Preview from "@/components/preview";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { IconBoxStyleType, Theme } from "@/types/style";
import { INIT_ICON_BOX_STYLE } from "@/constants/step";

export default function ThemeForm() {
  const session = {
    techStack: sessionStorage.getItem("techStack"),
    theme: sessionStorage.getItem("theme"),
    iconBoxStyle: sessionStorage.getItem("iconBoxStyle"),
    title: sessionStorage.getItem("title"),
  };

  const selectedTechs = session.techStack
    ? (JSON.parse(session.techStack) as string[])
    : [];
  const selectedTheme = session.theme ? (session.theme as Theme) : "light";
  const selectedIconBoxStyle = session.iconBoxStyle
    ? (JSON.parse(session.iconBoxStyle) as IconBoxStyleType)
    : INIT_ICON_BOX_STYLE;
  const title = session.title || "";

  const [theme, setTheme] = useState<Theme>(selectedTheme);

  const storeTheme = (theme: Theme) => {
    sessionStorage.setItem("theme", theme);
  };

  return (
    <>
      <Preview
        iconBoxStyle={selectedIconBoxStyle}
        techs={selectedTechs}
        theme={theme}
        title={title}
      />

      <CardContent className="grid grid-cols-2 space-x-4">
        <Button
          variant={theme === "light" ? "default" : "outline"}
          size="lg"
          onClick={() => setTheme("light")}
        >
          <Sun />
          <span>light</span>
        </Button>
        <Button
          variant={theme === "dark" ? "default" : "outline"}
          size="lg"
          className={
            theme === "dark" ? "bg-blue-600 text-white transition-colors" : ""
          }
          onClick={() => setTheme("dark")}
        >
          <Moon />
          <span>dark</span>
        </Button>
      </CardContent>

      <CardFooter className="justify-between">
        <Link
          href="/step/1"
          className={cn(buttonVariants({ variant: "outline" }))}
          onClick={() => {
            storeTheme(theme);
          }}
        >
          Back
        </Link>
        <Link
          href="/step/3"
          className={cn(buttonVariants({ variant: "default" }))}
          onClick={() => {
            storeTheme(theme);
          }}
        >
          Next
        </Link>
      </CardFooter>
    </>
  );
}
