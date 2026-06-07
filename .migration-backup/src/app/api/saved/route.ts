import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId parameter' }, { status: 400 });
    }

    const saved = await prisma.savedCalculation.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    return NextResponse.json({ saved });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, toolId, title, inputs, outputs } = body;

    if (!userId || !toolId || !title || !inputs || !outputs) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const saved = await prisma.savedCalculation.create({
      data: {
        userId,
        toolId,
        title,
        inputs,
        outputs,
      },
    });

    return NextResponse.json({ success: true, savedId: saved.id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing calculation ID' }, { status: 400 });
    }

    await prisma.savedCalculation.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
