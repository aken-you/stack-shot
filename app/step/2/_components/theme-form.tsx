"use client";

import Preview from "@/components/preview";
import { Button, buttonVariants } from "@/components/ui/button";
import { COOKIE_MAX_AGE } from "@/constants/step";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { IconBoxStyleType, Theme } from "@/types/style";

export default function ThemeForm({
  initSelectedTheme = "light",
  selectedTechs,
  selectedIconBoxStyle,
  title,
}: {
  initSelectedTheme?: Theme;
  selectedTechs: string[];
  selectedIconBoxStyle?: IconBoxStyleType;
  title?: string;
}) {
  const [theme, setTheme] = useState<Theme>(initSelectedTheme);

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
        >
          Back
        </Link>
        <Link
          href="/step/3"
          className={cn(buttonVariants({ variant: "default" }))}
          onClick={() => {
            document.cookie = `theme=${theme}; max-age=${COOKIE_MAX_AGE}; path=/`;
          }}
        >
          Next
        </Link>
      </CardFooter>
    </>
  );
}
