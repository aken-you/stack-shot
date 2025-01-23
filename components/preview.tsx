import { Card } from "@/components/ui/card";
import logoImg from "../app/icon.svg";
import Image from "next/image";
import type { IconBoxStyleType, WrapperBoxStyleType } from "@/types/style";

interface PreviewProps {
  iconBoxStyle: IconBoxStyleType;
  wrapperBoxStyle?: WrapperBoxStyleType;
}

export default function Preview({
  iconBoxStyle,
  wrapperBoxStyle,
}: PreviewProps) {
  return (
    <Card className="overflow-x-auto bg-slate-100 p-6">
      <div className="flex min-h-[200px] items-center justify-center">
        <div
          className="flex w-32 flex-col items-center gap-1 p-2"
          style={{
            ...wrapperBoxStyle,
            border: wrapperBoxStyle?.borderColor
              ? `1px solid ${wrapperBoxStyle.borderColor}`
              : "none",
          }}
        >
          <div
            className="h-21 w-21 mx-auto mb-2"
            style={{
              ...iconBoxStyle,
              margin: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: iconBoxStyle.borderColor
                ? `1px solid ${iconBoxStyle.borderColor}`
                : "none",
            }}
          >
            <Image src={logoImg} width="80" height="80" alt="logo-image" />
          </div>
          <div
            className="text-center font-semibold"
            style={{
              color: wrapperBoxStyle?.color ? wrapperBoxStyle.color : "#000000",
            }}
          >
            stack name
          </div>
        </div>
      </div>
    </Card>
  );
}
