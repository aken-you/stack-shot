"use client";

import Preview from "@/components/preview";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { COOKIE_MAX_AGE } from "@/constants/step";
import { cn } from "@/lib/utils";
import type { IconBoxStyleType, Theme } from "@/types/style";
import { Check, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function TechForm({
  techs,
  initSelectedTechs,
  selectedTheme,
  selectedIconBoxStyle,
  title,
}: {
  techs: string[];
  initSelectedTechs: string[];
  selectedTheme?: Theme;
  selectedIconBoxStyle?: IconBoxStyleType;
  title?: string;
}) {
  const [keyword, setKeyword] = useState<string>("");
  const [selectedTechs, setSelectedTechs] =
    useState<string[]>(initSelectedTechs);

  const filteredTech = techs.filter((tech) => tech.includes(keyword));

  const handleSelect = (target: string) => {
    if (selectedTechs.includes(target)) {
      handleRemove(target);
    } else {
      setSelectedTechs((prev) => [...prev, target]);
    }
  };

  const handleRemove = (target: string) => {
    setSelectedTechs((prev) => prev.filter((tech) => tech !== target));
  };

  return (
    <>
      <Preview
        techs={selectedTechs}
        theme={selectedTheme}
        iconBoxStyle={selectedIconBoxStyle}
        title={title}
      />

      <CardContent>
        <div className="mb-4 flex flex-wrap gap-2">
          {selectedTechs.map((tech) => (
            <Badge key={tech} variant="secondary" className="px-2 py-1 text-sm">
              <div className="flex items-center gap-2">
                <Image
                  alt={tech}
                  src={`../stack/${tech}.svg`}
                  width={24}
                  height={24}
                />
                <span>{tech.replace(/-/g, " ")}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground ml-2 h-auto p-0 hover:text-foreground"
                onClick={() => handleRemove(tech)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>

        <Command className="rounded-lg border shadow-md">
          <CommandInput
            placeholder="Search tech stack..."
            value={keyword}
            onValueChange={setKeyword}
          />
          <CommandList>
            <CommandGroup>
              {filteredTech.map((tech) => (
                <CommandItem key={tech} onSelect={() => handleSelect(tech)}>
                  <Check
                    className={`mr-2 h-4 w-4 ${selectedTechs.includes(tech) ? "opacity-100" : "opacity-0"}`}
                  />
                  <div className="flex items-center gap-2">
                    <Image
                      alt={tech}
                      src={`../stack/${tech}.svg`}
                      width={24}
                      height={24}
                    />
                    <span>{tech.replace(/-/g, " ")}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CardContent>

      <CardFooter className="justify-end">
        <Link
          href={selectedTechs.length > 0 ? "/step/2" : ""}
          className={cn(
            buttonVariants({ variant: "default" }),
            selectedTechs.length > 0 ? "" : "pointer-events-none opacity-50",
          )}
          tabIndex={selectedTechs.length > 0 ? 0 : -1}
          onClick={() => {
            document.cookie = `techStack=${JSON.stringify(selectedTechs)}; max-age=${COOKIE_MAX_AGE}; path=/`;
          }}
        >
          Next
        </Link>
      </CardFooter>
    </>
  );
}
