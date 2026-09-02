interface LogoProps {
  variant?: "light" | "dark" | "auto";
  className?: string;
}

const SIZE = { width: 406, height: 132 };

export function Logo({
  variant = "auto",
  className = "h-8",
}: LogoProps) {
  const imgClass = `w-auto ${className}`;

  switch (variant) {
    case "light":
      return (
        <img
          src="/logo.png"
          alt="Revauri"
          width={SIZE.width}
          height={SIZE.height}
          className={imgClass}
        />
      );
    case "dark":
      return (
        <img
          src="/logo-dark.png"
          alt="Revauri"
          width={SIZE.width}
          height={SIZE.height}
          className={imgClass}
        />
      );
    case "auto":
      return (
        <span className="inline-flex">
          <span className="sr-only">Revauri</span>
          <img
            src="/logo.png"
            alt=""
            width={SIZE.width}
            height={SIZE.height}
            className={`${imgClass} dark:hidden`}
          />
          <img
            src="/logo-dark.png"
            alt=""
            width={SIZE.width}
            height={SIZE.height}
            className={`${imgClass} hidden dark:block`}
          />
        </span>
      );
    default: {
      const _exhaustive: never = variant;
      return _exhaustive;
    }
  }
}
