import { NextResponse } from "next/server";
// fs는 node.js 파일 시스템 모듈로, 파일을 읽거나 쓰는 작업을 할 수 있다.
import fs from "fs";
// path는 node.js의 경로 관련 모듈로, 파일 및 디렉토리 경로를 다루는데 사용된다.
import path from "path";

export async function GET() {
  // 기술 스택 아이콘들이 저장된 디렉토리 경로 지정
  const iconsDir = path.join(process.cwd(), "public/stack"); // process.cwd()는 현재 프로젝트 디렉토리를 반환한다.
  const files = fs.readdirSync(iconsDir);

  return NextResponse.json(files);
}
