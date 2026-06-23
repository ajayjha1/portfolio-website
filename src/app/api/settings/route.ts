import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "m37labs-portfolio-admin-token";
const settingsFile = path.join(process.cwd(), "src", "data", "settings.json");

function readSettings() {
  return JSON.parse(fs.readFileSync(settingsFile, "utf-8"));
}

function writeSettings(data: object) {
  fs.writeFileSync(settingsFile, JSON.stringify(data, null, 2));
}

function isAdmin(req: NextRequest) {
  return req.headers.get("Authorization") === `Bearer ${ADMIN_TOKEN}`;
}

export async function GET() {
  return NextResponse.json(readSettings());
}

export async function PUT(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const current = readSettings();
  const updated = { ...current, ...body };
  writeSettings(updated);
  return NextResponse.json(updated);
}
