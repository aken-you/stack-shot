"use client";

import Preview from "@/components/preview";
import { Button } from "@/components/ui/button";
import { INIT_ICON_BOX_STYLE } from "@/constants/step";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Step2() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  useEffect(() => {
    const savedTechStack = sessionStorage.getItem("techStack");

    if (savedTechStack) {
      setSelectedTechs(JSON.parse(savedTechStack));
    }

    const savedTheme = sessionStorage.getItem("theme");

    if (savedTheme) {
      setTheme(JSON.parse(savedTheme));
    }
  }, []);

  return (
    <>
      <CardHeader>
        <CardTitle>Select Theme</CardTitle>
        <CardDescription>이미지 테마를 선택해주세요!</CardDescription>
      </CardHeader>

      <Preview
        iconBoxStyle={INIT_ICON_BOX_STYLE}
        techs={selectedTechs}
        theme={theme}
      />

      <CardContent className="grid grid-cols-2 space-x-4">
        <Button
          variant="outline"
          size="lg"
          className={
            theme === "light" ? "bg-blue-600 text-white transition-colors" : ""
          }
          onClick={() => setTheme("light")}
        >
          <Sun />
          <span>light</span>
        </Button>
        <Button
          variant="outline"
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
          className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800 transition-colors hover:shadow-md"
        >
          Back
        </Link>
        <Link
          href="/step/3"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700 hover:shadow-md"
          onClick={() => {
            sessionStorage.setItem("theme", JSON.stringify(theme));
          }}
        >
          Next
        </Link>
      </CardFooter>
    </>
  );
}
