import { FadeInWhenVisible } from "./motion-wrappers";

const TECH_STACK = [
  {
    name: "Vercel",
    description:
      "Enterprise-grade hosting with global edge delivery and instant rollbacks.",
    icon: (
      <svg className="h-9 w-9 text-brand-orange" viewBox="0 0 76 65" fill="currentColor">
        <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
      </svg>
    ),
  },
  {
    name: "Next.js",
    description:
      "The React framework behind the fastest sites on the web.",
    icon: (
      <svg className="h-10 w-10" viewBox="0 0 180 180" fill="none">
        <circle cx="90" cy="90" r="90" className="fill-brand-orange" />
        <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" className="fill-white" />
        <rect x="115" y="54" width="12" height="72" className="fill-white" />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    description:
      "Utility-first styling for pixel-perfect, responsive design at any screen size.",
    icon: (
      <svg className="h-8 w-10 text-brand-orange" viewBox="0 0 54 33" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" />
      </svg>
    ),
  },
  {
    name: "shadcn/ui",
    description:
      "Accessible, beautifully designed components built on Radix UI primitives.",
    icon: (
      <svg className="h-9 w-9" viewBox="0 0 256 256" fill="none">
        <line x1="208" y1="128" x2="128" y2="208" className="stroke-brand-orange" strokeWidth="32" strokeLinecap="round" />
        <line x1="192" y1="40" x2="40" y2="192" className="stroke-brand-orange" strokeWidth="32" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function StatsBar() {
  return (
    <FadeInWhenVisible>
      <section className="bg-brand-orange/5 py-16 dark:bg-brand-orange/[0.03] lg:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-10 text-center text-xs font-semibold uppercase tracking-widest text-brand-mid-gray">
            Built on the modern web stack
          </p>

          {/* Mobile / tablet: 2x2 grid */}
          <div className="grid grid-cols-2 gap-8 xl:hidden">
            {TECH_STACK.map((tech) => (
              <div key={tech.name} className="flex flex-col">
                <div className="mb-3 h-10 flex items-end">{tech.icon}</div>
                <h3 className="text-base font-bold text-brand-dark dark:text-brand-cream">
                  {tech.name}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>

          {/* Desktop: single row with orange divider lines */}
          <div className="hidden xl:flex xl:items-stretch xl:justify-center xl:gap-0">
            {TECH_STACK.map((tech, i) => (
              <div key={tech.name} className="flex items-stretch">
                {i > 0 && (
                  <div className="mx-8 w-px self-stretch bg-brand-orange/25 flex-shrink-0" />
                )}
                <div className="flex flex-col max-w-[260px]">
                  <div className="mb-3 h-10 flex items-end">{tech.icon}</div>
                  <h3 className="text-base font-bold text-brand-dark dark:text-brand-cream">
                    {tech.name}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-brand-dark/60 dark:text-brand-cream/60">
                    {tech.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </FadeInWhenVisible>
  );
}
