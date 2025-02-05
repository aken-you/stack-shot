"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ColorInput } from "@/components/color-input";
import Preview from "@/components/preview";
import Link from "next/link";
import { INIT_ICON_BOX_STYLE } from "@/constants/step";
import type { IconBoxStyleType } from "@/types/style";

export default function Step3() {
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [iconBoxStyle, setIconBoxStyle] =
    useState<IconBoxStyleType>(INIT_ICON_BOX_STYLE);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIconBoxStyle((prev) => ({
      ...prev,
      [name]: name === "borderRadius" ? `${value}px` : value,
    }));
  };

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
        <h1 className="text-2xl font-semibold tracking-tight">
          Style Icon Box
        </h1>
        <p className="text-muted-foreground text-sm">
          아이콘 박스의 스타일을 설정해주세요!
        </p>
      </div>

      <Preview
        iconBoxStyle={iconBoxStyle}
        techs={selectedTechs}
        theme={theme}
      />

      <div className="grid gap-6">
        {/* background */}
        <div>
          <h3 className="mb-2 text-lg font-bold">Background</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <ColorInput
              id="backgroundColor"
              name="backgroundColor"
              value={iconBoxStyle.backgroundColor}
              onChange={handleInputChange}
              onCheckedChange={(checked) => {
                setIconBoxStyle((prev) => ({
                  ...prev,
                  backgroundColor: checked
                    ? "transparent"
                    : INIT_ICON_BOX_STYLE.backgroundColor,
                }));
              }}
              label="Background Color"
            />
          </div>
        </div>

        {/* shadow */}
        <div>
          <h3 className="mb-2 text-lg font-bold">Shadow</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <ColorInput
              id="shadowColor"
              name="shadowColor"
              value={iconBoxStyle.boxShadow ?? ""}
              onChange={handleInputChange}
              label="Shadow Color"
              onCheckedChange={(checked) => {
                setIconBoxStyle((prev) => ({
                  ...prev,
                  boxShadow: checked ? "transparent" : "#E2E8F0",
                }));
              }}
            />
          </div>
        </div>

        {/* border */}
        <div>
          <h3 className="mb-2 text-lg font-bold">Border</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <ColorInput
              id="borderColor"
              name="borderColor"
              value={iconBoxStyle.borderColor}
              onChange={handleInputChange}
              label="Border Color"
              onCheckedChange={(checked) => {
                setIconBoxStyle((prev) => ({
                  ...prev,
                  borderColor: checked
                    ? "transparent"
                    : INIT_ICON_BOX_STYLE.borderColor,
                }));
              }}
            />

            <div className="space-y-2">
              <Label htmlFor="borderRadius">Border Radius (px)</Label>
              <Input
                id="borderRadius"
                name="borderRadius"
                type="number"
                value={Number.parseInt(iconBoxStyle.borderRadius)}
                onChange={handleInputChange}
                min="0"
                max="50"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Link
          href="/step/2"
          className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800 transition-colors hover:shadow-md"
        >
          Back
        </Link>
        <Link
          href="/step/4"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700 hover:shadow-md"
          onClick={() => {
            sessionStorage.setItem(
              "iconBoxStyle",
              JSON.stringify(iconBoxStyle),
            );
          }}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
