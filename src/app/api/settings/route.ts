import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "m37labs-portfolio-admin-token";
const SETTINGS_KEY = "portfolio:settings";
const settingsFile = path.join(process.cwd(), "src", "data", "settings.json");

function readFile() {
  return JSON.parse(fs.readFileSync(settingsFile, "utf-8"));
}

async function getRedis() {
  const { Redis } = await import("@upstash/redis");
  return new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });
}

async function readSettings() {
  if (process.env.KV_REST_API_URL) {
    const redis = await getRedis();
    const data = await redis.get(SETTINGS_KEY);
    if (data) return data;
    // First run: seed Redis from the committed JSON file
    const seed = readFile();
    await redis.set(SETTINGS_KEY, seed);
    return seed;
  }
  return readFile();
}

async function writeSettings(data: object) {
  if (process.env.KV_REST_API_URL) {
    const redis = await getRedis();
    await redis.set(SETTINGS_KEY, data);
  } else {
    fs.writeFileSync(settingsFile, JSON.stringify(data, null, 2));
  }
}

function isAdmin(req: NextRequest) {
  return req.headers.get("Authorization") === `Bearer ${ADMIN_TOKEN}`;
}

export async function GET() {
  const data = await readSettings();
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const current = await readSettings();
  const updated = { ...current, ...body };
  await writeSettings(updated);
  return NextResponse.json(updated);
}
