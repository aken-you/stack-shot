"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Preview from "@/components/preview";
import Link from "next/link";
import { INIT_ICON_BOX_STYLE } from "@/constants/step";
import type { IconBoxStyleType } from "@/types/style";

export default function Step4() {
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [iconBoxStyle, setIconBoxStyle] =
    useState<IconBoxStyleType>(INIT_ICON_BOX_STYLE);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const savedTechStack = sessionStorage.getItem("techStack");

    if (savedTechStack) {
      setSelectedTechs(JSON.parse(savedTechStack));
    }

    const savedTheme = sessionStorage.getItem("theme");

    if (savedTheme) {
      setTheme(JSON.parse(savedTheme));
    }

    const savedIconBoxStyle = sessionStorage.getItem("iconBoxStyle");

    if (savedIconBoxStyle) {
      setIconBoxStyle(JSON.parse(savedIconBoxStyle));
    }
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Set Title</h1>
        <p className="text-muted-foreground text-sm">타이틀을 설정해주세요!</p>
      </div>

      <Preview
        title={title}
        iconBoxStyle={iconBoxStyle}
        techs={selectedTechs}
        theme={theme}
      />

      <div className="space-y-2">
        <Label>Title</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="타이틀 (선택 사항)"
        />
      </div>

      <div className="flex justify-center">
        <Link
          href="step/1"
          className="transform rounded-3xl bg-blue-500 px-6 py-2 text-xl font-semibold text-white shadow-xl transition-colors transition-transform hover:scale-110 hover:bg-blue-700 focus:scale-110"
        >
          완성 🚀
        </Link>
      </div>
    </div>
  );
}
