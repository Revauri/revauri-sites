interface LogoProps {
  variant?: "light" | "dark";
  suffix?: string;
  className?: string;
}

export function Logo({
  variant = "light",
  suffix,
  className = "",
}: LogoProps) {
  const textColor =
    variant === "dark" ? "text-brand-cream" : "text-brand-dark";

  return (
    <span
      className={`relative inline-flex items-baseline text-xl font-semibold tracking-tight ${textColor} ${className}`}
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
        <span className="ml-1.5 font-normal tracking-normal">{suffix}</span>
      )}
    </span>
  );
}
