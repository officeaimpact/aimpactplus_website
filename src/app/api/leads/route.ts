import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/lead-schema";
import { routeLead } from "@/lib/lead-routing";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rl = rateLimit(ip);
  if (!rl.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: "rate_limit",
        retryAfterMs: rl.retryAfterMs,
      },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "validation",
        issues: parsed.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 422 },
    );
  }

  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json(
      { ok: false, error: "spam" },
      { status: 400 },
    );
  }

  const routed = await routeLead(parsed.data);

  return NextResponse.json(routed, { status: 200 });
}

export async function GET() {
  return NextResponse.json(
    {
      endpoint: "/api/leads",
      method: "POST",
      description: "Lead submission with zod validation, honeypot and rate-limit.",
    },
    { status: 200 },
  );
}
