/**
 * Curso de Game Guardian — estrutura de módulos e progresso.
 */

export interface Lesson {
  id: string;
  path: string;
  title: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export const COURSE_MODULES: Module[] = [
  {
    id: "introducao",
    title: "Introdução",
    description: "O que é, instalação e permissões",
    lessons: [
      { id: "inicio", path: "/", title: "Início" },
      { id: "o-que-e", path: "/o-que-e", title: "O que é Game Guardian?" },
      { id: "instalacao", path: "/instalacao", title: "Download e Instalação" },
      { id: "permissoes", path: "/permissoes", title: "Permissões Root" },
    ],
  },
  {
    id: "interface-busca",
    title: "Interface & Busca",
    description: "Navegação, busca básica e avançada",
    lessons: [
      { id: "interface", path: "/interface", title: "Interface do App" },
      { id: "busca-basica", path: "/busca-basica", title: "Busca Básica de Valores" },
      { id: "tipos-de-busca", path: "/tipos-de-busca", title: "Tipos de Busca" },
      { id: "edicao-de-memoria", path: "/edicao-de-memoria", title: "Edição de Memória" },
    ],
  },
  {
    id: "recursos-avancados",
    title: "Recursos Avançados",
    description: "Scripts Lua e técnicas avançadas",
    lessons: [
      { id: "grupos-de-valores", path: "/grupos-de-valores", title: "Grupos e Favoritos" },
      { id: "scripts-lua", path: "/scripts-lua", title: "Scripts Lua (Intro)" },
      { id: "scripts-avancados", path: "/scripts-avancados", title: "Scripts Lua (Avançado)" },
      { id: "hacks-populares", path: "/hacks-populares", title: "Hacks Populares" },
    ],
  },
  {
    id: "seguranca",
    title: "Segurança",
    description: "Virtual space, bypass e anti-ban",
    lessons: [
      { id: "virtual-space", path: "/virtual-space", title: "Virtual Space / VMOS" },
      { id: "bypass-anti-cheat", path: "/bypass-anti-cheat", title: "Bypass Anti-Cheat" },
      { id: "uso-seguro", path: "/uso-seguro", title: "Uso Seguro (Anti-ban)" },
    ],
  },
  {
    id: "extras",
    title: "Extras",
    description: "Troubleshooting e ética",
    lessons: [
      { id: "troubleshooting", path: "/troubleshooting", title: "Troubleshooting" },
      { id: "etica", path: "/etica", title: "Ética e Responsabilidade" },
      { id: "referencias", path: "/referencias", title: "Referências" },
    ],
  },
];

const STORAGE_KEY = "gameguardian-curso-progresso";

export function getProgress(): Set<string> {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  } catch {
    return new Set();
  }
}

export function saveProgress(completed: Set<string>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
}

export function markLessonComplete(lessonId: string): void {
  const completed = getProgress();
  completed.add(lessonId);
  saveProgress(completed);
}

export function isLessonCompleted(lessonId: string): boolean {
  return getProgress().has(lessonId);
}

export function getCourseProgress(): {
  completed: number;
  total: number;
  percentage: number;
} {
  const completed = getProgress();
  const allLessons = COURSE_MODULES.flatMap((m) => m.lessons);
  const total = allLessons.length;
  const done = allLessons.filter((l) => completed.has(l.id)).length;
  return {
    completed: done,
    total,
    percentage: total > 0 ? Math.round((done / total) * 100) : 0,
  };
}

export function getNextLesson(currentPath: string): Lesson | null {
  const allLessons = COURSE_MODULES.flatMap((m) => m.lessons);
  const idx = allLessons.findIndex((l) => l.path === currentPath);
  return idx >= 0 && idx < allLessons.length - 1 ? allLessons[idx + 1] : null;
}

export function getPrevLesson(currentPath: string): Lesson | null {
  const allLessons = COURSE_MODULES.flatMap((m) => m.lessons);
  const idx = allLessons.findIndex((l) => l.path === currentPath);
  return idx > 0 ? allLessons[idx - 1] : null;
}

export function getLessonByPath(path: string): Lesson | undefined {
  return COURSE_MODULES.flatMap((m) => m.lessons).find((l) => l.path === path);
}
