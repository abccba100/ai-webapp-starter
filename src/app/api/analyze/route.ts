import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userIdea } = body;

    if (!userIdea) {
      return NextResponse.json({ error: '아이디어를 입력해주세요.' }, { status: 400 });
    }

    const aiResponse = {
      project_name: "AI_Generated_Project",
      summary: `사용자가 입력한 '${userIdea}'에 대한 핵심 기능 분석 결과입니다.`,
      features: [
        {
          id: 1,
          name: "사용자 인증 시스템",
          description: "이메일 및 소셜 로그인을 통한 회원가입/로그인 기능",
          priority: "High"
        },
        {
          id: 2,
          name: "메인 대시보드",
          description: "핵심 데이터를 시각화하여 보여주는 화면",
          priority: "Medium"
        },
        {
          id: 3,
          name: "설정 관리",
          description: "사용자 프로필 및 알림 설정 변경",
          priority: "Low"
        }
      ],
      tech_stack: ["Next.js", "TypeScript", "Tailwind CSS"],
      estimated_time: "2 weeks"
    };

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json(aiResponse);

  } catch (error) {
    return NextResponse.json({ error: '서버 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
