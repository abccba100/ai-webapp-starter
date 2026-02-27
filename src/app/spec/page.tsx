"use client";
import SpecEditor from '@/components/SpecEditor';
import { useRouter } from 'next/navigation';
import { useWizard } from '@/context/WizardContext';

export default function SpecPage() {
  const router = useRouter();
  const { idea } = useWizard();

  return (
    <div className="max-w-3xl mx-auto p-6 animate-fade-in-up">
      <div className="mb-8">
        <span className="text-sm font-semibold text-blue-600 mb-1 block">Step 2. 기능 명세</span>
        <h1 className="text-3xl font-bold mb-3">AI가 제안하는 앱 설계도입니다</h1>
        <p className="text-gray-600">
          &quot;<span className="font-medium text-gray-900">{idea.slice(0, 20)}{idea.length > 20 ? '...' : ''}</span>&quot;에 대한 분석 결과예요.<br/>
          수정하거나 추가할 내용이 있나요?
        </p>
      </div>
      
      <SpecEditor />
      
      <div className="mt-10 flex justify-between items-center border-t pt-6">
        <button 
          onClick={() => router.push('/input')}
          className="text-gray-500 hover:text-gray-800 underline text-sm"
        >
          마음에 안 드나요? 다시 입력하기
        </button>

        <button 
          onClick={() => router.push('/design')}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-bold shadow-md transition transform hover:scale-105">
          이대로 진행하기 →
        </button>
      </div>
    </div>
  );
}
