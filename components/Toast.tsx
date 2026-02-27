// src/components/Toast.tsx
// (생략 가능, 개념적으로 제안)
export default function Toast({ message, type }: { message: string, type: 'success'|'error' }) {
  const color = type === 'success' ? 'bg-green-600' : 'bg-red-500';
  return (
    <div className={`fixed bottom-4 right-4 ${color} text-white px-6 py-3 rounded-lg shadow-lg animate-bounce`}>
      {message}
    </div>
  );
}