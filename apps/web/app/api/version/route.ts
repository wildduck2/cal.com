import { defaultResponderForAppDir } from "app/api/defaultResponderForAppDir";
import { NextResponse } from "next/server";
import pjson from "package.json";

async function getHandler() {
  return NextResponse.json({ version: pjson.version });
}

export const GET = defaultResponderForAppDir(getHandler);
