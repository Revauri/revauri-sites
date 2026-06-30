interface LogoProps {
  variant?: "light" | "dark" | "auto";
  suffix?: string;
  className?: string;
}

export function Logo({
  variant = "auto",
  suffix,
  className = "",
}: LogoProps) {
  const textColor =
    variant === "dark"
      ? "text-brand-cream"
      : variant === "light"
        ? "text-brand-dark"
        : "text-brand-dark dark:text-brand-cream";

  return (
    <span
      className={`relative inline-flex items-baseline font-serif text-xl font-semibold tracking-tight ${textColor} ${className}`}
    >
      Revauri
      {/* Rising accent bar — overlays the i's tittle */}
      <span
        className="absolute bg-brand-orange"
        style={{
          width: "8px",
          height: "2.5px",
          borderRadius: "1.5px",
          right: "0px",
          top: "0.15em",
          transform: "rotate(-35deg)",
        }}
        aria-hidden="true"
      />
      {suffix && (
        <span className="ml-1.5 font-sans text-base font-normal tracking-wide text-brand-mid-gray">{suffix}</span>
      )}
    </span>
  );
}
