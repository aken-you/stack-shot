import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const iconsDir = path.join(process.cwd(), "public/stack");
  const files = fs
    .readdirSync(iconsDir)
    .filter((file) => file.endsWith(".svg"))
    .map((file) => file.replace(".svg", ""));

  return NextResponse.json(files);
}
