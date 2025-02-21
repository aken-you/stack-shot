"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ColorInput } from "@/components/color-input";
import Preview from "@/components/preview";
import Link from "next/link";
import { CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { INIT_ICON_BOX_STYLE } from "@/constants/step";
import type { IconBoxStyleType, Theme } from "@/types/style";

export default function StyleForm() {
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

  const [iconBoxStyle, setIconBoxStyle] =
    useState<IconBoxStyleType>(selectedIconBoxStyle);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIconBoxStyle((prev) => ({
      ...prev,
      [name]: name === "borderRadius" ? `${value}px` : value,
    }));
  };

  const storeIconBoxStyle = (iconBoxStyle: IconBoxStyleType) => {
    sessionStorage.setItem("iconBoxStyle", JSON.stringify(iconBoxStyle));
  };

  return (
    <>
      <Preview
        iconBoxStyle={iconBoxStyle}
        techs={selectedTechs}
        theme={selectedTheme}
        title={title}
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
          onClick={() => {
            storeIconBoxStyle(iconBoxStyle);
          }}
        >
          Back
        </Link>
        <Link
          href="/step/4"
          className={cn(buttonVariants({ variant: "default" }))}
          onClick={() => {
            storeIconBoxStyle(iconBoxStyle);
          }}
        >
          Next
        </Link>
      </CardFooter>
    </>
  );
}
