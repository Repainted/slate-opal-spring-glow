import { useEffect, useState } from "react";
import { useT } from "@/preventivi/lib/i18n";
import { cn } from "@/preventivi/lib/utils";

type BeforeInstall = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(display-mode: standalone)").matches) return true;
  const nav = window.navigator as Navigator & { standalone?: boolean };
  return Boolean(nav.standalone);
}

function isIos(): boolean {
  const ua = window.navigator.userAgent;
  return /iPhone|iPad|iPod/i.test(ua) || (/Macintosh/i.test(ua) && window.navigator.maxTouchPoints > 1);
}

export function InstallApp({ compact }: { compact?: boolean }) {
  const { t } = useT();
  const [standalone, setStandalone] = useState(false);
  const [promptEvent, setPromptEvent] = useState<BeforeInstall | null>(null);
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    setStandalone(isStandalone());
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setPromptEvent(e as BeforeInstall);
    };
    const onInstalled = () => setDone(true);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (standalone || done) {
    if (compact) return null;
    return (
      <p className="rounded-2xl bg-card px-4 py-3 text-sm text-muted-foreground shadow-[var(--shadow-border)]">
        {t("settings.installed")}
      </p>
    );
  }

  async function install() {
    if (promptEvent) {
      await promptEvent.prompt();
      const choice = await promptEvent.userChoice;
      if (choice.outcome === "accepted") setDone(true);
      return;
    }
    if (isIos()) {
      window.location.assign("/?install=1&platform=ios");
      return;
    }
    setHint(true);
  }

  async function share() {
    const url = window.location.origin;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Cantiere", url, text: t("settings.installLead") });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      } catch {
        window.prompt(t("settings.shareLink"), url);
      }
    }
  }

  if (compact) {
    return (
      <button
        type="button"
        onClick={() => void install()}
        className="mt-4 flex h-12 w-full items-center justify-center rounded-xl bg-secondary text-sm font-semibold"
      >
        {t("settings.install")}
      </button>
    );
  }

  return (
    <section className="mt-6">
      <h2 className="mb-2 text-base font-medium">{t("settings.install")}</h2>
      <p className="mb-3 text-sm text-muted-foreground">{t("settings.installLead")}</p>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => void install()}
          className="h-14 rounded-xl bg-brick text-base font-semibold text-brick-foreground"
        >
          {t("settings.install")}
        </button>
        <button
          type="button"
          onClick={() => void share()}
          className="h-14 rounded-xl bg-secondary text-base font-semibold"
        >
          {copied ? t("list.copied") : t("settings.shareLink")}
        </button>
      </div>
      {hint ? (
        <p className={cn("mt-3 text-sm text-muted-foreground")}>{t("settings.installHint")}</p>
      ) : null}
    </section>
  );
}
