"use client";

import type { IconBoxStyleType, Theme } from "@/types/style";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Preview from "@/components/preview";
import Link from "next/link";
import * as htmlToImage from "html-to-image";
import { useRouter } from "next/navigation";
import { sendGAEvent } from "@next/third-parties/google";
import { INIT_ICON_BOX_STYLE } from "@/constants/step";
import { uploadTechStackImage } from "@/app/actions";

export default function TitleForm() {
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
  const initTitle = session.title || "";

  const [title, setTitle] = useState<string>(initTitle);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const previewRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const storeTitle = (title: string) => {
    sessionStorage.setItem("title", title);
  };

  const resetSession = () => {
    sessionStorage.removeItem("techStack");
    sessionStorage.removeItem("theme");
    sessionStorage.removeItem("iconBoxStyle");
    sessionStorage.removeItem("title");
  };

  const handleDownloadPreview = async () => {
    if (!previewRef.current) return;

    try {
      setIsUploading(true);

      const previewImageBlob = await htmlToImage.toBlob(previewRef.current);

      if (!previewImageBlob) {
        throw new Error("failed to create image blob");
      }

      const formData = new FormData();
      formData.append("file", previewImageBlob);

      const response = await uploadTechStackImage(formData);

      if ("error" in response) {
        throw new Error(response.error);
      }

      resetSession();

      const { imageUrl } = response;

      sessionStorage.setItem("imageUrl", imageUrl);
      sendGAEvent("event", "buttonClicked", {
        event_category: "기술_스택_이미지_생성",
      });

      router.push("/download");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
      console.error(error);
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
