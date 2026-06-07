import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventType, toolId, category, durationMs, referrer } = body;

    if (!eventType) {
      return NextResponse.json({ error: 'Missing eventType parameter' }, { status: 400 });
    }

    const event = await prisma.analyticsEvent.create({
      data: {
        eventType,
        toolId: toolId || null,
        category: category || null,
        durationMs: durationMs ? Number(durationMs) : null,
        referrer: referrer || null,
      },
    });

    return NextResponse.json({ success: true, eventId: event.id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
