import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

type RevalidateBody = {
  paths?: string[];
};

export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!secret || token !== secret) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  let body: RevalidateBody = {};
  try {
    body = (await req.json()) as RevalidateBody;
  } catch {
    body = {};
  }

  const paths = Array.isArray(body.paths) && body.paths.length > 0 ? body.paths : ['/'];

  for (const p of paths) revalidatePath(p);

  return NextResponse.json({ ok: true, revalidated: paths });
}
