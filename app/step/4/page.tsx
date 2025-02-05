"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Preview from "@/components/preview";
import Link from "next/link";
import { INIT_ICON_BOX_STYLE } from "@/constants/step";
import type { IconBoxStyleType } from "@/types/style";
import * as htmlToImage from "html-to-image";
import { useRouter } from "next/navigation";

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

  const previewRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleDownloadPreview = async () => {
    if (!previewRef.current) return;

    const imageData = await htmlToImage.toBlob(previewRef.current);

    if (!imageData) return;

    const formData = new FormData();
    formData.append("file", imageData);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const { imageUrl } = await response.json();

    sessionStorage.removeItem("techStack");
    sessionStorage.removeItem("theme");
    sessionStorage.removeItem("iconBoxStyle");
    sessionStorage.removeItem("title");

    sessionStorage.setItem("imageUrl", imageUrl);
    router.push("/download");
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Set Title</h1>
        <p className="text-muted-foreground text-sm">타이틀을 설정해주세요!</p>
      </div>

      <Preview
        ref={previewRef}
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

      <div className="flex justify-between">
        <Link
          href="/step/3"
          className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800 transition-colors hover:shadow-md"
        >
          Back
        </Link>
        <button
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700 hover:shadow-md"
          onClick={() => {
            sessionStorage.setItem("title", JSON.stringify(title));

            handleDownloadPreview();
          }}
        >
          이미지 생성하기 🚀
        </button>
      </div>
    </>
  );
}
