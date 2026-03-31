"use client";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-cream">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-24 lg:grid-cols-2 lg:py-32">
        <div className="flex flex-col justify-center">
          <h1
            className="text-4xl font-bold leading-[1.1] tracking-tight text-brand-dark opacity-0 animate-fade-in-up sm:text-5xl md:text-[3.25rem] lg:text-6xl"
          >
            Modern websites for businesses that are ready to grow.
          </h1>
          <p
            className="mt-6 max-w-lg text-lg leading-relaxed text-brand-mid-gray opacity-0 animate-fade-in-up"
            style={{ animationDelay: "150ms" }}
          >
            We design fast, mobile-first websites that help small businesses
            look as professional online as they are in person.
          </p>
        </div>
        <div className="relative hidden items-center justify-center lg:flex" aria-hidden="true">
          <div
            className="absolute opacity-0 animate-scale-in"
            style={{ animationDelay: "350ms" }}
          >
            {/* Large gradient arc */}
            <div
              className="h-[380px] w-[380px] rounded-full xl:h-[440px] xl:w-[440px]"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, #D97757 0%, rgba(217,119,87,0.12) 70%, transparent 100%)",
              }}
            />
          </div>
          {/* Smaller accent circle */}
          <div
            className="absolute -bottom-8 -right-4 h-24 w-24 rounded-full border-2 border-brand-orange/20 opacity-0 animate-fade-in"
            style={{ animationDelay: "650ms" }}
          />
          {/* Tiny dot cluster */}
          <div
            className="absolute left-8 top-12 opacity-0 animate-fade-in"
            style={{ animationDelay: "500ms" }}
          >
            <div className="flex gap-3">
              <div className="h-2 w-2 rounded-full bg-brand-orange/30" />
              <div className="h-2 w-2 rounded-full bg-brand-orange/20" />
              <div className="h-2 w-2 rounded-full bg-brand-orange/10" />
            </div>
          </div>
        </div>
      </div>
      {/* Subtle bottom divider */}
      <div className="h-px bg-brand-light-gray" aria-hidden="true" />
    </section>
  );
}
