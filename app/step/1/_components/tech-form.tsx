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
import { cn, getTechName } from "@/lib/utils";
import { Check, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import useForm from "@/hooks/use-form";

export default function TechForm({ techs }: { techs: string[] }) {
  const { isInitialized, techStack, setTechStack, theme, title, iconBoxStyle } =
    useForm();

  const handleSelect = (target: string) => {
    if (techStack.includes(target)) {
      handleUnselect(target);
    } else {
      setTechStack((prev) => [...prev, target]);
    }
  };

  const handleUnselect = (target: string) => {
    setTechStack((prev) => prev.filter((tech) => tech !== target));

    if (techStack.length === 1) {
      sessionStorage.removeItem("techStack");
    }
  };

  return (
    <>
      <Preview
        techs={techStack}
        theme={theme}
        iconBoxStyle={iconBoxStyle}
        title={title}
        isLoading={isInitialized}
      />

      <CardContent>
        <div className="mb-4 flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <Badge key={tech} variant="secondary" className="px-2 py-1 text-sm">
              <div className="flex items-center gap-2">
                <Image
                  alt={tech}
                  src={`../stack/${tech}`}
                  width={24}
                  height={24}
                />
                <span>{getTechName(tech)}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground ml-2 h-auto p-0 hover:text-foreground"
                onClick={() => handleUnselect(tech)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>

        <Command
          className="rounded-lg border shadow-md"
          filter={(value, search) => {
            if (value.toLowerCase().includes(search.toLowerCase())) return 1;
            return 0;
          }}
        >
          <CommandInput placeholder="Search tech stack..." />
          <CommandList>
            <CommandGroup>
              {techs.map((tech) => (
                <CommandItem key={tech} onSelect={() => handleSelect(tech)}>
                  <Check
                    className={`mr-2 h-4 w-4 ${techStack.includes(tech) ? "opacity-100" : "opacity-0"}`}
                  />
                  <div className="flex items-center gap-2">
                    <Image
                      alt={tech}
                      src={`../stack/${tech}`}
                      width={24}
                      height={24}
                    />
                    <span>{getTechName(tech)}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CardContent>

      <CardFooter className="justify-end">
        <Link
          href={techStack.length > 0 ? "/step/2" : ""}
          className={cn(
            buttonVariants({ variant: "default" }),
            techStack.length > 0 ? "" : "pointer-events-none opacity-50",
          )}
          tabIndex={techStack.length > 0 ? 0 : -1}
          onClick={() => {
            sessionStorage.setItem("techStack", JSON.stringify(techStack));
          }}
        >
          Next
        </Link>
      </CardFooter>
    </>
  );
}
