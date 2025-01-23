"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ColorInput } from "@/components/color-input";
import Preview from "@/components/preview";
import Link from "next/link";
import { INIT_ICON_BOX_STYLE, INIT_WRAPPER_BOX_STYLE } from "@/constants/step";
import type { IconBoxStyleType, WrapperBoxStyleType } from "@/types/style";

export default function Step2() {
  const [initIconBoxStyle, setInitIconBoxStyle] =
    useState<IconBoxStyleType>(INIT_ICON_BOX_STYLE);
  const [wrapperBoxStyle, setWrapperBoxStyle] = useState<WrapperBoxStyleType>(
    INIT_WRAPPER_BOX_STYLE,
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setWrapperBoxStyle((prev) => ({
      ...prev,
      [name]: name === "borderRadius" ? `${value}px` : value,
    }));
  };

  useEffect(() => {
    const savedIconBoxStyle = sessionStorage.getItem("iconBoxStyle");
    const savedWrapperBoxStyle = sessionStorage.getItem("wrapperBoxStyle");

    if (savedIconBoxStyle) {
      setInitIconBoxStyle(JSON.parse(savedIconBoxStyle));
    }
    if (savedWrapperBoxStyle) {
      setWrapperBoxStyle(JSON.parse(savedWrapperBoxStyle));
    }
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Style Wrapper Box
        </h1>
        <p className="text-muted-foreground text-sm">
          아이콘과 텍스트를 감싸는 박스의 스타일을 설정해주세요!
        </p>
      </div>
      <Preview
        iconBoxStyle={initIconBoxStyle}
        wrapperBoxStyle={wrapperBoxStyle}
      />
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2">
          <ColorInput
            id="backgroundColor"
            name="backgroundColor"
            value={wrapperBoxStyle.backgroundColor}
            onChange={handleInputChange}
            onCheckedChange={(checked) => {
              setWrapperBoxStyle((prev) => ({
                ...prev,
                backgroundColor: checked
                  ? "transparent"
                  : INIT_WRAPPER_BOX_STYLE.backgroundColor,
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
              value={wrapperBoxStyle.boxShadow}
              onChange={handleInputChange}
              placeholder={INIT_WRAPPER_BOX_STYLE.boxShadow}
            />
          </div>
          <ColorInput
            id="color"
            name="color"
            value={wrapperBoxStyle.color}
            onChange={handleInputChange}
            label="Text Color"
          />
        </div>
        <div>
          <h3 className="mb-2 text-lg font-semibold">Border Settings</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <ColorInput
              id="borderColor"
              name="borderColor"
              value={wrapperBoxStyle.borderColor}
              onChange={handleInputChange}
              label="Border Color"
              onCheckedChange={(checked) => {
                setWrapperBoxStyle((prev) => ({
                  ...prev,
                  borderColor: checked
                    ? "transparent"
                    : INIT_WRAPPER_BOX_STYLE.borderColor,
                }));
              }}
            />

            <div className="space-y-2">
              <Label htmlFor="borderRadius">Border Radius (px)</Label>
              <Input
                id="borderRadius"
                name="borderRadius"
                type="number"
                value={Number.parseInt(wrapperBoxStyle.borderRadius)}
                onChange={handleInputChange}
                min="0"
                max="50"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <Link
            href="/step/1"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700 hover:shadow-md"
          >
            Previous
          </Link>
          <Link
            href="/step/3"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700 hover:shadow-md"
            onClick={() => {
              sessionStorage.setItem(
                "wrapperBoxStyle",
                JSON.stringify(wrapperBoxStyle),
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
