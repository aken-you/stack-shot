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
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

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
      <CardHeader>
        <CardTitle>Set Title</CardTitle>
        <CardDescription>타이틀을 설정해주세요!</CardDescription>
      </CardHeader>

      <Preview
        ref={previewRef}
        title={title}
        iconBoxStyle={iconBoxStyle}
        techs={selectedTechs}
        theme={theme}
      />

      <CardContent className="space-y-2">
        <Label>Title</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="타이틀 (선택 사항)"
        />
      </CardContent>

      <CardFooter className="justify-between">
        <Link
          href="/step/3"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Back
        </Link>
        <Button
          onClick={() => {
            sessionStorage.setItem("title", JSON.stringify(title));

            handleDownloadPreview();
          }}
        >
          이미지 생성하기 🚀
        </Button>
      </CardFooter>
    </>
  );
}
