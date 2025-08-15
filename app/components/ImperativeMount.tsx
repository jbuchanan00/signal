import React from "react";
import { loadRemoteNavbars } from "../lib/handleRemotes/remoteNavbars";

type Which = "TopNavInstance" | "BottomNavInstance";

type Props = {
  url: string;
  which: Which;
  mountProps?: Record<string, unknown>;
  placeholderHeight?: number;
};

export default function ImperativeMount({
  url,
  which,
  mountProps,
  placeholderHeight = 56,
}: Props) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const handleRef = React.useRef<null | { destroy?: () => void; update?: (p: any) => void }>(null);
  const remoteRef = React.useRef<any>(null);

  // Stable snapshot of props so we don't remount on every render
  const stableProps = React.useMemo(() => mountProps ?? {}, [JSON.stringify(mountProps ?? {})]);

  // Cleanup helper (runs before any new mount and on unmount)
  const cleanup = React.useCallback(() => {
    try {
      handleRef.current?.destroy?.();
    } catch (e) {
      console.error("Error destroying remote navbar:", e);
    } finally {
      handleRef.current = null;
      if (ref.current) ref.current.innerHTML = ""; // ensure the slot is empty
    }
  }, []);

  // Mount once per url/which change (StrictMode-safe: we pre-clean)
  React.useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const remote = await loadRemoteNavbars(url);
        if (cancelled) return;
        remoteRef.current = remote;

        const mountFn = remote[which];
        if (typeof mountFn !== "function") {
          console.error(`Remote export "${which}" not found at ${url}`);
          return;
        }

        // StrictMode double-invoke guard: always clean before mounting
        cleanup();

        if (!ref.current) return;

        // Support both styles: function disposer OR handle {destroy, update}
        const result = mountFn(ref.current, stableProps);
        if (typeof result === "function") {
          handleRef.current = { destroy: result };
        } else {
          // No explicit handle returned; try to detect Svelte instance patterns
          handleRef.current = null;
        }
      } catch (e) {
        console.error("Failed to mount remote navbar:", e);
      }
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [url, which, cleanup]); // NOTE: not depending on mountProps here

  // Prop updates (don’t remount if the remote exposes update(); otherwise remount)
  React.useEffect(() => {
    const handle = handleRef.current;
    const remote = remoteRef.current;
    if (!ref.current || !remote) return;

    const updateName =
      (which === "TopNavInstance" && "UpdateTopNavInstance") ||
      (which === "BottomNavInstance" && "UpdateBottomNavInstance");

    // Prefer handle.update if returned
    if (handle?.update) {
      try {
        handle.update(stableProps);
        return;
      } catch (e) {
        console.warn("Remote update() failed; falling back to remount:", e);
      }
    }

    // Try module-level update(target, props)
    const modUpdate = remote[updateName as string];
    if (typeof modUpdate === "function") {
      try {
        modUpdate(ref.current, stableProps);
        return;
      } catch (e) {
        console.warn("Module-level update failed; falling back to remount:", e);
      }
    }

    // Fallback: remount with new props
    // (call cleanup then call the same mount as above)
    const mountFn = remote[which];
    if (typeof mountFn === "function") {
      cleanup();
      const result = mountFn(ref.current, stableProps);
      if (typeof result === "function") {
        handleRef.current = { destroy: result };
      } else if (result && (result.destroy || result.update)) {
        handleRef.current = result;
      }
    }
  }, [stableProps, which, cleanup]);

  return <div ref={ref} style={{ minHeight: placeholderHeight }} data-slot="navbar" />;
}
