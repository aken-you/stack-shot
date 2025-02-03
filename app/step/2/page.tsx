"use client";

import Preview from "@/components/preview";
import { Button } from "@/components/ui/button";
import { INIT_ICON_BOX_STYLE } from "@/constants/step";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Select Theme</h1>
        <p className="text-muted-foreground text-sm">
          이미지 테마를 선택해주세요!
        </p>
      </div>

      <Preview
        iconBoxStyle={INIT_ICON_BOX_STYLE}
        techs={selectedTechs}
        theme={theme}
      />

      <div className="grid grid-cols-2 space-x-4">
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
      </div>

      <div className="flex justify-between">
        <Link
          href="/step/1"
          className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800 transition-colors hover:bg-blue-100 hover:shadow-md"
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
      </div>
    </div>
  );
}
