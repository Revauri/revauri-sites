import type { Ref } from "react";
import { MessageCircle, X } from "lucide-react";

export function ChatLauncherButton({
  isOpen,
  onClick,
  onPrefetch,
  cookieBannerOpen,
  ref,
}: {
  isOpen: boolean;
  onClick: () => void;
  onPrefetch?: () => void;
  cookieBannerOpen: boolean;
  ref?: Ref<HTMLButtonElement>;
}) {
  // Safe-area clears the home indicator; cookie-open offsets clear the banner
  // at every breakpoint (previously only lg, so mobile FAB sat under the card).
  const bottomClass = cookieBannerOpen
    ? "bottom-52 sm:bottom-36 lg:bottom-32"
    : "bottom-[max(1.25rem,env(safe-area-inset-bottom))]";

  return (
    <div
      className={`group fixed right-5 z-[70] flex items-center gap-2 transition-[bottom] duration-300 ${bottomClass}`}
    >
      <span className="pointer-events-none translate-x-2 whitespace-nowrap rounded-full bg-brand-dark px-4 py-2 text-sm font-semibold text-white opacity-0 shadow-md transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100 dark:bg-brand-cream dark:text-brand-dark">
        Chat with us
      </span>
      <button
        ref={ref}
        className={`flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-brand-orange/30 active:scale-[0.92] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange ${
          isOpen ? "" : "animate-pulse-glow"
        }`}
        onClick={onClick}
        onMouseEnter={onPrefetch}
        onFocus={onPrefetch}
        // Touch devices never fire mouseenter; start loading on first press.
        onPointerDown={onPrefetch}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}
