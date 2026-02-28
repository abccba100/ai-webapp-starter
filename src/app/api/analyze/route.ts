import { NextResponse } from 'next/server';
import { getProvider } from '@/lib/ai';

export async function GET() {
  return NextResponse.json(
    { error: 'Method Not Allowed. POST만 지원합니다.' },
    { status: 405 }
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: '요청 본문이 올바른 JSON이 아닙니다.' },
      { status: 400 }
    );
  }

  try {
    if (body === null || typeof body !== 'object') {
      return NextResponse.json(
        { error: '요청 본문이 올바른 JSON이 아닙니다.' },
        { status: 400 }
      );
    }

    const idea = typeof (body as { idea?: unknown }).idea === 'string' ? (body as { idea: string }).idea.trim() : '';

    if (!idea) {
      return NextResponse.json(
        { error: 'idea 텍스트를 입력해주세요.' },
        { status: 400 }
      );
    }

    const provider = getProvider();
    const result = await provider.analyzeIdea(idea);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: '서버 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
