"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { sendGAEvent } from "@next/third-parties/google";
import { Copy, CopyCheck, FileCheck, FileDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Download() {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    const storedImage = sessionStorage.getItem("imageUrl");

    if (!storedImage) return;

    setImageUrl(storedImage);
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold">이미지가 완성되었습니다 🎉</h1>

      <div className="mt-4 flex flex-wrap justify-center gap-4">
        <DownloadButton imageUrl={imageUrl} />
        <CopyButton imageUrl={imageUrl} />
      </div>

      <Card className="bg-slate-100 p-6">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="Generated Image"
            width={0}
            height={0}
            unoptimized={true}
            priority
            style={{
              width: "auto",
              height: "auto",
            }}
          />
        )}
      </Card>
    </>
  );
}

function DownloadButton({ imageUrl }: { imageUrl: string }) {
  const [downloadState, setDownloadState] = useState<
    "idle" | "loading" | "done"
  >("idle");

  const downloadImage = async (imageUrl: string) => {
    try {
      setDownloadState("loading");

      const response = await fetch(imageUrl);

      if (!response.ok) {
        throw new Error("Failed to download image");
      }

      const blob = await response.blob();

      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "dev-stack.png";

      a.click();

      setDownloadState("done");
      sendGAEvent("event", "buttonClicked", {
        event_category: "이미지_다운로드",
      });

      setTimeout(() => {
        setDownloadState("idle");
      }, 3000);
    } catch (_error) {
      alert("이미지 다운로드에 실패했습니다.");
      setDownloadState("idle");
    }
  };

  return (
    <Button
      size="lg"
      className={`w-[12.75rem] ${downloadState === "done" ? "bg-green-500 hover:bg-green-400 disabled:opacity-100" : ""}`}
      disabled={
        !imageUrl || downloadState === "loading" || downloadState === "done"
      }
      onClick={() => {
        if (!imageUrl) {
          alert("이미지가 없습니다.");
          return;
        }

        downloadImage(imageUrl);
      }}
    >
      {downloadState === "idle" ? (
        <>
          <FileDown />
          이미지 파일 다운로드
        </>
      ) : (
        <>
          <FileCheck />
          다운로드 완료
        </>
      )}
    </Button>
  );
}

function CopyButton({ imageUrl }: { imageUrl: string }) {
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");

  const copyImageUrl = (imageUrl: string) => {
    navigator.clipboard.writeText(imageUrl);

    setCopyState("copied");
    sendGAEvent("event", "buttonClicked", {
      event_category: "이미지_링크_복사",
    });

    setTimeout(() => {
      setCopyState("idle");
    }, 3000);
  };

  return (
    <Button
      size="lg"
      className={`w-[12.75rem] ${copyState === "copied" ? "bg-green-500 hover:bg-green-400 disabled:opacity-100" : ""}`}
      disabled={!imageUrl || copyState === "copied"}
      onClick={() => {
        if (!imageUrl) {
          alert("이미지가 없습니다.");
          return;
        }

        copyImageUrl(imageUrl);
      }}
    >
      {copyState === "copied" ? (
        <>
          <CopyCheck />
          링크 복사 완료
        </>
      ) : (
        <>
          <Copy />
          이미지 링크 복사
        </>
      )}
    </Button>
  );
}
