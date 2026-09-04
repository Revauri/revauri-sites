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
      {/* Hover label is desktop-only — hover never fires on touch devices. */}
      <span className="pointer-events-none hidden translate-x-2 whitespace-nowrap rounded-full border border-white/10 bg-brand-dark/95 px-3.5 py-2 text-[13px] font-semibold text-brand-cream opacity-0 shadow-[0_8px_24px_-8px_rgba(20,20,19,0.45)] backdrop-blur transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100 sm:inline-flex dark:border-brand-dark/10 dark:bg-brand-cream dark:text-brand-dark">
        Chat with us
      </span>
      <button
        ref={ref}
        className={`flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#E89B7E_0%,#D97757_55%,#C65D3B_100%)] text-white shadow-[0_12px_32px_-8px_rgba(217,119,87,0.55),inset_0_1px_1px_rgba(255,255,255,0.3)] ring-1 ring-brand-orange/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-8px_rgba(217,119,87,0.65),inset_0_1px_1px_rgba(255,255,255,0.3)] active:translate-y-0 active:scale-[0.94] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/60 focus-visible:ring-offset-2 ${
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
        {isOpen ? (
          <X className="h-6 w-6" strokeWidth={2.25} />
        ) : (
          <MessageCircle className="h-6 w-6" strokeWidth={2.25} />
        )}
      </button>
    </div>
  );
}
