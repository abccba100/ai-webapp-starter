// src/components/Stepper.tsx
"use client";
import { usePathname } from 'next/navigation';

const steps = [
  { path: '/input', label: 'Idea' },
  { path: '/spec', label: 'Spec' },
  { path: '/design', label: 'Design' },
  { path: '/build', label: 'Build' },
];

export default function Stepper() {
  const pathname = usePathname();
  if (pathname === '/') return null;

  return (
    <nav className="flex justify-center py-6">
      <div className="flex items-center space-x-4">
        {steps.map((step, idx) => {
          const isActive = pathname.startsWith(step.path);
          return (
            <div key={step.path} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold 
                ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {idx + 1}
              </div>
              <span className={`ml-2 text-sm ${isActive ? 'font-bold text-gray-800' : 'text-gray-400'}`}>
                {step.label}
              </span>
              {idx < steps.length - 1 && <div className="w-8 h-px bg-gray-300 ml-4" />}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
