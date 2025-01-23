"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ColorInput } from "@/components/color-input";
import Preview from "@/components/preview";
import Link from "next/link";
import { INIT_ICON_BOX_STYLE } from "@/constants/step";
import type { IconBoxStyleType } from "@/types/style";

export default function Step1() {
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
    const saved = sessionStorage.getItem("iconBoxStyle");

    if (saved) {
      setIconBoxStyle(JSON.parse(saved));
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
      <Preview iconBoxStyle={iconBoxStyle} />
      <div className="grid gap-6">
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
          <div className="space-y-2">
            <Label htmlFor="boxShadow">Box Shadow</Label>
            <Input
              id="boxShadow"
              name="boxShadow"
              type="text"
              value={iconBoxStyle.boxShadow}
              onChange={handleInputChange}
              placeholder={INIT_ICON_BOX_STYLE.boxShadow}
            />
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-lg font-semibold">Border Settings</h3>
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
        <div className="flex justify-end">
          <Link
            href="/step/2"
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
    </div>
  );
}
