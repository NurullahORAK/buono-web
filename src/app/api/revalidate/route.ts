import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

type RevalidateBody = { paths?: string[] };

function getBearer(req: Request) {
  const a = req.headers.get('authorization');
  const m = a?.match(/^Bearer\s+(.+)$/i);
  return m?.[1] ?? null;
}

function normalizeAndFilter(paths: string[]) {
  return paths
    .map((p) => (p.startsWith('/') ? p : `/${p}`))
    .map((p) => p.trim())
    .filter((p) => p.length > 0)
    .filter((p) => p.length < 200)
    .filter((p) => !p.includes('..'))
    .filter((p) => !p.includes('://'))
    .filter((p) => !p.startsWith('/api')) // istersen kaldırabilirsin; genelde gerek yok
    .slice(0, 20); // ✅ limit
}

export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  const { searchParams } = new URL(req.url);

  const token = getBearer(req) ?? searchParams.get('token');

  if (!secret || token !== secret) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  let body: RevalidateBody = {};
  try {
    body = (await req.json()) as RevalidateBody;
  } catch {
    body = {};
  }

  const rawPaths = Array.isArray(body.paths) && body.paths.length ? body.paths : ['/'];
  const safePaths = normalizeAndFilter(rawPaths);

  if (safePaths.length === 0) {
    return NextResponse.json({ ok: false, error: 'No valid paths' }, { status: 400 });
  }

  for (const p of safePaths) revalidatePath(p);

  const res = NextResponse.json({ ok: true, revalidated: safePaths });
  res.headers.set('Cache-Control', 'no-store');
  return res;
}
