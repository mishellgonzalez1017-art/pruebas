import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRightCircle,
  Fingerprint,
  LockKeyhole,
  Menu,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const navLinks = ["Vault", "Plans", "Install", "News", "Help"] as const;

const easeOut = [0.22, 1, 0.36, 1] as const;

function Logo() {
  return (
    <a
      href="#vault"
      className="group inline-flex items-center gap-2.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4"
      aria-label="VaultShield home"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="none"
        overflow="visible"
        viewBox="0 0 256 256"
        aria-hidden="true"
      >
        <path
          d="M 64 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 L 128 64 L 128 64.5 L 161 32 L 192 0 L 256 0 L 256 64 L 192 128 L 128 128 L 128 192 L 96 223 L 63.5 256 L 0 256 L 0 192 Z M 256 192 L 224 223 L 191.5 256 L 128 256 L 128 192 L 192 128 L 256 128 Z"
          fill="#192837"
        />
      </svg>
      <span className="font-heading text-[1.15rem] tracking-[-0.045em] text-ink sm:text-xl">
        VaultShield
      </span>
    </a>
  );
}

function AccountActions({ stacked = false }: { stacked?: boolean }) {
  return (
    <div className={stacked ? "grid gap-3" : "flex items-center gap-3"}>
      <a
        href="#install"
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_18px_rgba(115,66,226,0.18)] transition duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        Start For Free
      </a>
      <a
        href="#signin"
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-login px-5 py-2.5 text-sm font-semibold text-ink ring-1 ring-inset ring-ink/10 transition duration-200 hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        Sign In
      </a>
    </div>
  );
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = sheetRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  return (
    <MotionConfig reducedMotion="user">
      <main
        id="vault"
        className="relative flex min-h-screen w-full flex-col overflow-hidden bg-login font-body text-ink"
      >
        <video
          className="hero-video"
          autoPlay={!prefersReducedMotion}
          muted
          loop={!prefersReducedMotion}
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260518_003132_8b7edcb6-c64d-4a52-a9ca-879942e122ad.mp4"
            type="video/mp4"
          />
        </video>
        <div className="hero-scrim" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />

        <header className="relative z-20 mx-auto flex w-full max-w-[1280px] items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
          <Logo />

          <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
            {navLinks.map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                className="rounded-sm text-sm font-medium text-ink/85 transition-opacity hover:text-ink hover:opacity-65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <AccountActions />
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-login/80 text-ink shadow-sm backdrop-blur-sm transition hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:hidden"
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={21} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </header>

        <section className="relative z-10 flex w-full flex-1 items-start md:items-center">
          <div
            className="mx-auto w-full max-w-[1280px] px-5 pb-20 sm:px-8 sm:pb-24"
            style={{ paddingTop: "clamp(40px, 8vw, 72px)" }}
          >
            <div className="max-w-[560px]">
              <motion.h1
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0, duration: 0.6, ease: easeOut }}
                className="font-heading text-[clamp(1.65rem,5vw,3rem)] leading-[1.05] tracking-[-0.01em] text-ink"
              >
                <Zap
                  className="relative top-[-2px] mr-1 inline-block h-6 w-6 align-middle"
                  aria-hidden="true"
                />
                Lock Down Your Passwords
                <LockKeyhole
                  className="relative top-[-2px] mx-1 inline-block h-6 w-6 align-middle"
                  aria-hidden="true"
                />
                with Ironclad Security
                <Fingerprint
                  className="relative top-[-2px] ml-1 inline-block h-6 w-6 align-middle"
                  aria-hidden="true"
                />
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6, ease: easeOut }}
                className="mt-6 max-w-[560px] text-[clamp(0.9rem,2.5vw,1.1rem)] leading-[1.65] text-ink/80"
              >
                Zero stress, total control. VaultShield keeps you covered with
                unbreakable storage, one-tap access, and pro-grade tools for your
                non-stop world.
              </motion.p>

              <motion.a
                href="#install"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: easeOut }}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : { scale: 1.04, filter: "brightness(1.1)" }
                }
                whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
                className="mt-8 flex min-h-[58px] min-w-[210px] items-center justify-between gap-8 rounded-full bg-accent px-6 py-[17px] text-[clamp(0.9rem,2vw,1rem)] font-semibold text-white shadow-[0_4px_24px_rgba(115,66,226,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4"
              >
                <span>Get It Free</span>
                <ArrowRightCircle size={20} strokeWidth={1.8} aria-hidden="true" />
              </motion.a>
            </div>
          </div>
        </section>

        <AnimatePresence initial={false}>
          {mobileOpen && (
            <>
              <motion.button
                type="button"
                aria-label="Close navigation menu"
                className="fixed inset-0 z-40 cursor-default border-0 bg-[rgba(25,40,55,0.35)] p-0 backdrop-blur-[4px] md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={closeMenu}
              />

              <motion.aside
                ref={sheetRef}
                id="mobile-navigation"
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
                className="fixed right-0 top-0 z-50 flex h-[100dvh] flex-col bg-[#CFC8C5] px-6 pb-7 pt-5 shadow-[-12px_0_48px_rgba(25,40,55,0.18)] md:hidden sm:px-8"
                style={{ width: "min(88vw, 360px)" }}
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.45, ease: easeOut }}
              >
                <div className="flex items-center justify-between">
                  <Logo />
                  <button
                    ref={closeButtonRef}
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-white/40 text-ink transition hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    aria-label="Close navigation menu"
                    onClick={closeMenu}
                  >
                    <X size={21} strokeWidth={1.8} aria-hidden="true" />
                  </button>
                </div>

                <div className="mt-6 h-px w-full bg-ink/15" />

                <nav aria-label="Mobile navigation" className="mt-7">
                  <ul className="space-y-1">
                    {navLinks.map((label, index) => (
                      <motion.li
                        key={label}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: {
                            delay: 0.18 + index * 0.07,
                            duration: 0.35,
                            ease: easeOut,
                          },
                        }}
                        exit={{ opacity: 0, y: 8, transition: { duration: 0.15 } }}
                      >
                        <a
                          href={`#${label.toLowerCase()}`}
                          onClick={closeMenu}
                          className="block rounded-xl px-3 py-3.5 font-heading text-2xl tracking-[-0.035em] text-ink transition hover:bg-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                          {label}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                <div className="mt-auto border-t border-ink/15 pt-6">
                  <AccountActions stacked />
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </main>
    </MotionConfig>
  );
}

export default App;
