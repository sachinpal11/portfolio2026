import Image from "next/image";
import type { Work } from "@/data/work";

/** 16:9 browser-window card. Shows the screenshot, or a skeleton placeholder until one is added. */
export function WorkCard({ title, image }: Work) {
  return (
    <article className="group relative aspect-video w-full overflow-hidden rounded-2xl bg-white p-1.5 shadow-[0_10px_30px_rgba(11,18,32,0.18)] transition-transform duration-500 ease-out hover:-translate-y-1 hover:scale-[1.02]">
      <div className="relative h-full overflow-hidden rounded-xl bg-slate-100">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 768px) 40vw, 45vw"
            className="object-cover object-top"
          />
        ) : (
          <div
            aria-label={`${title} screenshot placeholder`}
            className="flex h-full flex-col gap-[3%] p-[4%]"
          >
            <div className="flex gap-1">
              <span className="size-1.5 rounded-full bg-slate-300" />
              <span className="size-1.5 rounded-full bg-slate-300" />
              <span className="size-1.5 rounded-full bg-slate-300" />
            </div>
            <div className="h-[7%] w-2/3 rounded bg-slate-200" />
            <div className="h-[5%] w-1/2 rounded bg-slate-200" />
            <div className="min-h-0 flex-1 rounded-lg bg-slate-200" />
            <p className="text-center text-[11px] font-medium uppercase tracking-widest text-slate-400">
              {title}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
