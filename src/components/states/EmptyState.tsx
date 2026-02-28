 "use client";

 import type { ReactNode } from "react";

 interface EmptyStateProps {
   title: string;
   description?: string;
   /**
    * 버튼이나 링크 등 액션 영역을 직접 렌더링하고 싶을 때 사용합니다.
    * 예: <EmptyState ...><Link ...>새 프로젝트 시작</Link></EmptyState>
    */
   children?: ReactNode;
 }

 /**
  * 데이터가 아직 없을 때(예: 첫 진입, 스펙 미생성, 빌드 결과 없음 등)
  * 중앙에 비어 있는 상태를 보여주는 공통 컴포넌트입니다.
  *
  * Tailwind 디자인 토큰(card, btn, primary 색상 등)에 맞춰
  * 어디서든 재사용할 수 있도록 최소한의 레이아웃만 정의합니다.
  */
 export default function EmptyState({ title, description, children }: EmptyStateProps) {
   return (
     <div className="w-full">
       <div className="card flex flex-col items-center justify-center px-6 py-12 text-center">
         <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
           <span className="text-2xl" aria-hidden>
             💡
           </span>
         </div>
         <h2 className="text-lg font-semibold text-slate-900 mb-2">{title}</h2>
         {description && (
           <p className="text-sm text-slate-500 max-w-md mx-auto mb-4">
             {description}
           </p>
         )}
         {children && (
           <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
             {children}
           </div>
         )}
       </div>
     </div>
   );
 }

