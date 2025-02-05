"use client";

import Preview from "@/components/preview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { INIT_ICON_BOX_STYLE } from "@/constants/step";
import useGetStackList from "@/hooks/use-get-stack-list";
import { Check, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Step1() {
  const [keyword, setKeyword] = useState<string>("");
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  const techs = useGetStackList();

  useEffect(() => {
    const savedTechStack = sessionStorage.getItem("techStack");

    if (savedTechStack) {
      setSelectedTechs(JSON.parse(savedTechStack));
    }
  }, []);

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
      <CardHeader>
        <CardTitle>Select Tech Stack</CardTitle>
        <CardDescription>기술 스택을 선택해주세요!</CardDescription>
      </CardHeader>

      <Preview iconBoxStyle={INIT_ICON_BOX_STYLE} techs={selectedTechs} />

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
            <CommandEmpty>No results found.</CommandEmpty>
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
          href="/step/2"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700 hover:shadow-md"
          onClick={() => {
            sessionStorage.setItem("techStack", JSON.stringify(selectedTechs));
          }}
        >
          Next
        </Link>
      </CardFooter>
    </>
  );
}
