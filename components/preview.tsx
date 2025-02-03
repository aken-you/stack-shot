import { Card } from "@/components/ui/card";
import Image from "next/image";
import type { IconBoxStyleType } from "@/types/style";

interface PreviewProps {
  iconBoxStyle: IconBoxStyleType;
  techs: string[];
  theme?: "light" | "dark";
}

export default function Preview({
  iconBoxStyle,
  techs,
  theme = "light",
}: PreviewProps) {
  return (
    <Card className="overflow-x-auto bg-slate-100 p-6">
      <div className="flex min-h-[12.5rem] w-fit items-center">
        {techs.length > 0 ? (
          <section
            className={`min-w-[47.75rem] px-12 py-9 ${theme === "dark" ? "bg-neutral-950 text-white" : "bg-white"}`}
          >
            <div className="grid grid-cols-6">
              {techs.map((tech) => (
                <TechItem key={tech} name={tech} iconBoxStyle={iconBoxStyle} />
              ))}
            </div>
          </section>
        ) : (
          <p className="h-full w-full text-center">기술 스택을 선택해주세요!</p>
        )}
      </div>
    </Card>
  );
}

function TechItem({
  iconBoxStyle,
  name,
}: {
  iconBoxStyle: IconBoxStyleType;
  name: string;
}) {
  return (
    <div className="flex w-28 flex-col items-center gap-2 p-2">
      <div
        className="mx-auto mb-2 h-20 w-20"
        style={{
          ...iconBoxStyle,
          margin: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: iconBoxStyle.borderColor
            ? `1px solid ${iconBoxStyle.borderColor}`
            : "none",
          boxShadow: `0 0 10px ${iconBoxStyle.boxShadow}`,
        }}
      >
        <Image src={`../stack/${name}.svg`} width="48" height="48" alt={name} />
      </div>
      <div className="text-center font-semibold leading-[1.2]">
        {name.replace(/-/g, " ")}
      </div>
    </div>
  );
}
