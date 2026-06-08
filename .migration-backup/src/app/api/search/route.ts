import { NextRequest, NextResponse } from 'next/server';
import { searchTools } from '@/lib/registry';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q') || '';
    
    // Asynchronously log search term to database for SEO analysis (doesn't block response)
    if (q.trim()) {
      prisma.searchLog
        .create({
          data: { query: q.trim().substring(0, 100) },
        })
        .catch(() => {}); // Safe catch to ensure DB failure doesn't affect user search
    }

    const matches = searchTools(q);
    
    return NextResponse.json({
      query: q,
      results: matches.slice(0, 6).map((t) => ({
        id: t.id,
        slug: t.slug,
        title: t.title,
        description: t.description,
        category: t.category,
      })),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
