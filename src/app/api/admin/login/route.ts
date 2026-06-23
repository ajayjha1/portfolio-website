import { NextRequest, NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "m37admin2026";
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "m37labs-portfolio-admin-token";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  if (password === ADMIN_PASSWORD) {
    return NextResponse.json({ token: ADMIN_TOKEN });
  }
  return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}
