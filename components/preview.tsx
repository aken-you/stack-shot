import { Card } from "@/components/ui/card";
import Image from "next/image";
import type { IconBoxStyleType } from "@/types/style";
import { INIT_ICON_BOX_STYLE } from "@/constants/step";
import { getTechName } from "@/lib/utils";

interface PreviewProps {
  ref?: React.Ref<HTMLDivElement | null>;
  title?: string;
  iconBoxStyle?: IconBoxStyleType;
  techs: string[];
  theme?: "light" | "dark";
}

export default function Preview({
  ref,
  title = "",
  iconBoxStyle = INIT_ICON_BOX_STYLE,
  techs,
  theme = "light",
}: PreviewProps) {
  return (
    <Card className="overflow-x-auto bg-slate-100 p-6">
      <div
        className={`flex min-h-[12.5rem] ${techs.length > 0 ? "w-fit" : "w-full"} items-center`}
      >
        {techs.length > 0 ? (
          <section
            ref={ref}
            className={`min-w-[47.75rem] px-12 py-9 ${theme === "dark" ? "bg-neutral-950 text-white" : "bg-white"} flex flex-col items-center gap-6`}
          >
            {title.length > 0 && (
              <h1
                className={`${theme === "dark" ? "text-white" : ""} text-2xl font-extrabold tracking-tight`}
              >
                {title}
              </h1>
            )}
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
        <Image src={`../stack/${name}`} width="48" height="48" alt={name} />
      </div>
      <div className="text-center font-semibold leading-[1.2]">
        {getTechName(name)}
      </div>
    </div>
  );
}
