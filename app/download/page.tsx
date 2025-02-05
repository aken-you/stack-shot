"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, FileDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Download() {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    const storedImage = sessionStorage.getItem("imageUrl");

    if (!storedImage) return;

    setImageUrl(storedImage);
  }, []);

  const downloadFile = async (url: string) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to download image");
      }

      const blob = await response.blob();

      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "dev-stack.png";

      a.click();
    } catch (_error) {
      alert("이미지 다운로드에 실패했습니다.");
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold">이미지가 완성되었습니다 🎉</h1>

      <div className="mt-4 flex flex-wrap justify-center gap-4">
        <Button
          size="lg"
          onClick={() => {
            if (!imageUrl) {
              alert("이미지가 없습니다.");
              return;
            }

            downloadFile(imageUrl);
          }}
        >
          <FileDown />
          이미지 파일 다운로드
        </Button>

        <Button
          size="lg"
          onClick={() => {
            if (!imageUrl) {
              alert("이미지가 없습니다.");
              return;
            }

            navigator.clipboard.writeText(imageUrl);
          }}
        >
          <Copy />
          이미지 링크 복사
        </Button>
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
