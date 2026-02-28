// src/app/projects/page.tsx
"use client";

import { useEffect, useState } from "react";
import { createSupabaseClient } from "@/lib/supabase/client";
import { createProject, listProjects } from "@/lib/supabase/projects";

interface Project {
  id: string;
  name: string;
  createdAt: string;
}

const STORAGE_KEY = "recent_projects";

export default function ProjectCreatePage() {
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const supabase = createSupabaseClient();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const load = async () => {
      if (supabase) {
        const rows = await listProjects(supabase);
        setProjects(
          rows.map((r) => ({
            id: r.id,
            name: r.name,
            createdAt: r.created_at,
          }))
        );
        return;
      }
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved) as Project[];
          setProjects(parsed);
        }
      } catch (e) {
        console.error("Failed to load recent projects", e);
      }
    };
    load();
  }, [supabase]);

  useEffect(() => {
    if (typeof window === "undefined" || supabase) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error("Failed to save recent projects", e);
    }
  }, [projects, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = projectName.trim();

    if (trimmed.length < 3) {
      setError("프로젝트 이름은 최소 3자 이상이어야 합니다.");
      return;
    }

    setError(null);
    setIsCreating(true);

    if (supabase) {
      const result = await createProject(supabase, trimmed);
      setIsCreating(false);
      if (result) {
        setProjects((prev) => [
          { id: result.id, name: trimmed, createdAt: new Date().toISOString() },
          ...prev,
        ]);
        setProjectName("");
      } else {
        setError("프로젝트 저장에 실패했습니다.");
      }
      return;
    }

    setTimeout(() => {
      const newProject: Project = {
        id: Date.now().toString(),
        name: trimmed,
        createdAt: new Date().toISOString(),
      };
      setProjects((prev) => [newProject, ...prev].slice(0, 5));
      setProjectName("");
      setIsCreating(false);
    }, 800);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[360px] animate-fade-in-up">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">프로젝트 생성</h1>
          <p className="text-sm text-slate-500">
            프로젝트 이름을 입력하고 최근 생성한 프로젝트를 한눈에 확인하세요.
            {supabase && " (Supabase에 저장됩니다)"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="projectName"
              className="block text-sm font-medium text-slate-700"
            >
              프로젝트 이름
            </label>
            <input
              id="projectName"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              disabled={isCreating}
              placeholder="예: 동네 장보기 공유 서비스"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-slate-100 disabled:text-slate-400"
            />
            {error && (
              <p className="text-xs text-red-500 mt-1">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isCreating}
            className={`w-full btn btn-primary h-11 gap-2 ${
              isCreating ? "opacity-80 cursor-not-allowed" : ""
            }`}
          >
            {isCreating && (
              <svg
                className="animate-spin h-4 w-4 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 01-4 4H4z"
                ></path>
              </svg>
            )}
            {isCreating ? "생성 중..." : "프로젝트 생성"}
          </button>
        </form>

        <div className="pt-4 border-t border-slate-200">
          <h2 className="text-sm font-semibold text-slate-800 mb-2">
            최근 프로젝트
          </h2>
          {projects.length === 0 ? (
            <p className="text-xs text-slate-400">
              아직 생성한 프로젝트가 없습니다.
            </p>
          ) : (
            <ul className="space-y-2 text-sm">
              {projects.map((project) => (
                <li
                  key={project.id}
                  className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
                >
                  <span className="font-medium text-slate-800 truncate mr-2">
                    {project.name}
                  </span>
                  <span className="text-[11px] text-slate-400 whitespace-nowrap">
                    {new Date(project.createdAt).toLocaleDateString("ko-KR", {
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
