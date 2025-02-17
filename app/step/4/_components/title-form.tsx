"use client";

import type { IconBoxStyleType, Theme } from "@/types/style";
import { useRef, useState } from "react";
import { cn, deleteCookie } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Preview from "@/components/preview";
import Link from "next/link";
import * as htmlToImage from "html-to-image";
import { useRouter } from "next/navigation";
import { COOKIE_MAX_AGE } from "@/constants/step";
import { sendGAEvent } from "@next/third-parties/google";

export default function TitleForm({
  initTitle = "",
  selectedTechs,
  selectedTheme,
  selectedIconBoxStyle,
}: {
  initTitle?: string;
  selectedTechs: string[];
  selectedTheme: Theme;
  selectedIconBoxStyle: IconBoxStyleType;
}) {
  const [title, setTitle] = useState<string>(initTitle);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const previewRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const storeTitle = (title: string) => {
    document.cookie = `title=${title}; max-age=${COOKIE_MAX_AGE}; path=/`;
  };

  const resetCookie = () => {
    deleteCookie("techStack");
    deleteCookie("theme");
    deleteCookie("iconBoxStyle");
    deleteCookie("title");
  };

  const handleDownloadPreview = async () => {
    if (!previewRef.current) return;

    try {
      setIsUploading(true);

      const imageData = await htmlToImage.toBlob(previewRef.current);

      if (!imageData) return;

      const formData = new FormData();
      formData.append("file", imageData);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const { imageUrl } = await response.json();

      resetCookie();

      sessionStorage.setItem("imageUrl", imageUrl);
      sendGAEvent("event", "buttonClicked", {
        event_category: "기술_스택_이미지_생성",
      });

      router.push("/download");
    } catch (_error) {
      alert("이미지 생성에 실패했습니다. 다시 시도해주세요.");
      setIsUploading(false);
    }
  };

  return (
    <>
      <Preview
        ref={previewRef}
        title={title}
        iconBoxStyle={selectedIconBoxStyle}
        techs={selectedTechs}
        theme={selectedTheme}
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
          onClick={() => {
            storeTitle(title);
          }}
        >
          Back
        </Link>
        <Button
          disabled={isUploading}
          onClick={() => {
            storeTitle(title);

            handleDownloadPreview();
          }}
        >
          {isUploading && <Loader2 className="animate-spin" />}
          이미지 생성하기 🚀
        </Button>
      </CardFooter>
    </>
  );
}
