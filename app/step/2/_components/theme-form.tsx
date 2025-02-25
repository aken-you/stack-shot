"use client";

import Preview from "@/components/preview";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Theme } from "@/types/style";
import useForm from "@/hooks/use-form";
import { ERROR_MESSAGE } from "@/constants/error";

export default function ThemeForm() {
  const { isInitialized, techStack, title, iconBoxStyle, theme, setTheme } =
    useForm();

  const storeTheme = (theme: Theme) => {
    sessionStorage.setItem("theme", theme);
  };

  if (!isInitialized && techStack.length === 0) {
    throw new Error(ERROR_MESSAGE.TECH_STACK_IS_NECESSARY);
  }

  return (
    <>
      <Preview
        iconBoxStyle={iconBoxStyle}
        techs={techStack}
        theme={theme}
        title={title}
        isLoading={isInitialized}
      />

      <CardContent className="grid grid-cols-2 space-x-4">
        <Button
          variant={!isInitialized && theme === "light" ? "default" : "outline"}
          size="lg"
          onClick={() => setTheme("light")}
        >
          <Sun />
          <span>light</span>
        </Button>
        <Button
          variant={!isInitialized && theme === "dark" ? "default" : "outline"}
          size="lg"
          onClick={() => setTheme("dark")}
        >
          <Moon />
          <span>dark</span>
        </Button>
      </CardContent>

      <CardFooter className="justify-between">
        <Link
          href="/step/1"
          className={cn(buttonVariants({ variant: "outline" }))}
          onClick={() => {
            storeTheme(theme);
          }}
        >
          Back
        </Link>
        <Link
          href="/step/3"
          className={cn(buttonVariants({ variant: "default" }))}
          onClick={() => {
            storeTheme(theme);
          }}
        >
          Next
        </Link>
      </CardFooter>
    </>
  );
}
