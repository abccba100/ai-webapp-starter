// src/components/SpecEditor.tsx
"use client";
import { useState } from 'react';
import { useWizard } from '@/context/WizardContext';
import { SpecItem } from '@/types';

export default function SpecEditor() {
  const { specs, setSpecs } = useWizard();
  const [showJson, setShowJson] = useState(false);
  const [newItem, setNewItem] = useState('');

  const addSpec = () => {
    if (!newItem) return;
    setSpecs([...specs, { id: Date.now().toString(), feature: newItem, priority: 'P1' } as SpecItem]);
    setNewItem('');
  };

  const removeSpec = (id: string) => {
    setSpecs(specs.filter(s => s.id !== id));
  };

  const togglePriority = (id: string) => {
    setSpecs(specs.map(s => 
      s.id === id ? { ...s, priority: s.priority === 'P0' ? 'P1' : 'P0' } : s
    ));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">기능 목록</h2>
        <button onClick={() => setShowJson(!showJson)} className="text-xs text-gray-500 underline">
          {showJson ? '리스트 보기' : 'JSON 보기'}
        </button>
      </div>

      {showJson ? (
        <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto h-64">
          {JSON.stringify(specs, null, 2)}
        </pre>
      ) : (
        <ul className="space-y-3">
          {specs.map((spec) => (
            <li key={spec.id} className="flex items-center justify-between p-3 border rounded bg-gray-50">
              <span className="flex-1">{spec.feature}</span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => togglePriority(spec.id)}
                  className={`text-xs px-2 py-1 rounded font-bold ${
                    spec.priority === 'P0' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                  }`}>
                  {spec.priority === 'P0' ? '필수' : '권장'}
                </button>
                <button onClick={() => removeSpec(spec.id)} className="text-gray-400 hover:text-red-500">
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex gap-2">
        <input 
          type="text" 
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="기능 직접 추가..."
          className="flex-1 border p-2 rounded"
          onKeyDown={(e) => e.key === 'Enter' && addSpec()}
        />
        <button onClick={addSpec} className="bg-gray-800 text-white px-4 rounded">추가</button>
      </div>
    </div>
  );
}
