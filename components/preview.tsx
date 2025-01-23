import { Card } from "@/components/ui/card";
import logoImg from "../app/icon.svg";
import Image from "next/image";

interface StyleProps {
  backgroundColor: string;
  borderRadius: string;
  borderColor: string;
  boxShadow: string;
}

interface PreviewProps {
  iconBoxStyle: StyleProps;
  wrapperBoxStyle?: StyleProps;
}

export default function Preview({
  iconBoxStyle,
  wrapperBoxStyle,
}: PreviewProps) {
  return (
    <Card className="bg-slate-100 p-6">
      <div className="flex min-h-[200px] items-center justify-center">
        <div
          style={{
            ...wrapperBoxStyle,
            display: "inline-block",
            border: wrapperBoxStyle?.borderColor
              ? `1px solid ${wrapperBoxStyle.borderColor}`
              : "none",
          }}
        >
          <div
            className="mx-auto mb-3 h-24 w-24"
            style={{
              ...iconBoxStyle,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: iconBoxStyle.borderColor
                ? `1px solid ${iconBoxStyle.borderColor}`
                : "none",
            }}
          >
            <Image src={logoImg} width="40" height="40" alt="logo-image" />
          </div>
          <div className="text-center font-semibold">stack name</div>
        </div>
      </div>
    </Card>
  );
}
