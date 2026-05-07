import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-black text-white mb-8 tracking-tight italic">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-l-4 border-[#FF4F00] pl-4">
        {children}
      </h2>
    ),
    p: ({ children }) => (
      <p className="text-slate-400 leading-relaxed mb-6 text-lg">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="space-y-4 mb-8 list-none">
        {children}
      </ul>
    ),
    li: ({ children }) => (
      <li className="flex gap-3 items-start text-slate-300">
        <span className="text-[#FF4F00] font-bold">/</span>
        {children}
      </li>
    ),
    strong: ({ children }) => (
      <strong className="text-white font-bold">{children}</strong>
    ),
    YouTube: ({ id }: { id: string }) => (
      <div className="my-12 aspect-video w-full rounded-3xl overflow-hidden border border-slate-800 shadow-2xl shadow-orange-500/5">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${id}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="bg-slate-900"
        />
      </div>
    ),
    ...components,
  };
}
