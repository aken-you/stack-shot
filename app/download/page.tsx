"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Files } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Download() {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    const storedImage = sessionStorage.getItem("imageUrl");

    if (!storedImage) return;

    setImageUrl(storedImage);
  }, []);

  const toDataURL = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();

    return URL.createObjectURL(blob);
  };

  const downloadFile = async (url: string) => {
    const a = document.createElement("a");
    a.href = await toDataURL(url);
    a.download = "dev-stack.png";

    a.click();
  };

  return (
    <>
      <h1 className="text-2xl font-bold">이미지가 완성되었습니다 🎉</h1>

      <div className="mt-4 flex flex-wrap justify-center gap-4">
        <Button
          size="lg"
          onClick={() => {
            if (!imageUrl) return;
            downloadFile(imageUrl);
          }}
        >
          <Files />
          이미지 파일 다운로드
        </Button>

        <Button
          size="lg"
          onClick={() => navigator.clipboard.writeText(imageUrl)}
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
