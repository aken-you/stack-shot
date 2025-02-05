"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ColorInput } from "@/components/color-input";
import Preview from "@/components/preview";
import Link from "next/link";
import { INIT_ICON_BOX_STYLE } from "@/constants/step";
import type { IconBoxStyleType } from "@/types/style";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

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
    <>
      <CardHeader>
        <CardTitle>Style Icon Box</CardTitle>
        <CardDescription>아이콘 박스의 스타일을 설정해주세요!</CardDescription>
      </CardHeader>

      <Preview
        iconBoxStyle={iconBoxStyle}
        techs={selectedTechs}
        theme={theme}
      />

      <CardContent className="grid gap-6">
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
      </CardContent>

      <CardFooter className="justify-between">
        <Link
          href="/step/2"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Back
        </Link>
        <Link
          href="/step/4"
          className={cn(buttonVariants({ variant: "default" }))}
          onClick={() => {
            sessionStorage.setItem(
              "iconBoxStyle",
              JSON.stringify(iconBoxStyle),
            );
          }}
        >
          Next
        </Link>
      </CardFooter>
    </>
  );
}
