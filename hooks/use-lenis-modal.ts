import { useEffect } from "react";
import { useLenis } from "@/providers/smooth-scroll-provider";

export function useLenisModal(open: boolean) {
  const lenis = useLenis();

  useEffect(() => {
    if (open) {
      lenis?.stop();
      return;
    }

    lenis?.start();
  }, [open, lenis]);
}
