"use client";

import { User } from "lucide-react";
import { useEffect, useRef } from "react";

export function HangingProfile() {
  const boxRef = useRef<HTMLDivElement>(null);
  const ropeRef = useRef<SVGLineElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const gravity = 1.2;
  const ropeLength = 180;
  const damping = 0.995;

  const state = useRef({
    angle: 0,
    velocity: 0,
    isDragging: false,
    dragX: 0,
    dragY: 0,
    currentLength: ropeLength,
  });

  useEffect(() => {
    let animationFrameId: number;

    const updatePhysics = () => {
      if (!state.current.isDragging) {
        state.current.currentLength +=
          (ropeLength - state.current.currentLength) * 0.1;

        const acceleration =
          (-gravity / state.current.currentLength) *
          Math.sin(state.current.angle);

        state.current.velocity += acceleration;
        state.current.velocity *= damping;
        state.current.angle += state.current.velocity;
      } else {
        const dx = state.current.dragX;
        const dy = Math.max(state.current.dragY, 10);

        const targetAngle = Math.atan2(dx, dy);
        let targetLength = Math.sqrt(dx * dx + dy * dy);

        if (targetLength > ropeLength) {
          targetLength = ropeLength + (targetLength - ropeLength) * 0.2;
        } else if (targetLength < ropeLength * 0.3) {
          targetLength = ropeLength * 0.3;
        }

        state.current.angle += (targetAngle - state.current.angle) * 0.4;
        state.current.currentLength +=
          (targetLength - state.current.currentLength) * 0.4;
        state.current.velocity = 0;
      }

      if (boxRef.current && ropeRef.current) {
        const x = state.current.currentLength * Math.sin(state.current.angle);
        const y = state.current.currentLength * Math.cos(state.current.angle);

        ropeRef.current.setAttribute("x2", (150 + x).toString());
        ropeRef.current.setAttribute("y2", y.toString());

        boxRef.current.style.transform = `translate(${x}px, ${y}px) rotate(${-state.current.angle}rad)`;
      }

      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    animationFrameId = requestAnimationFrame(updatePhysics);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handlePointerDown = (event: React.PointerEvent) => {
    state.current.isDragging = true;

    if (boxRef.current) {
      boxRef.current.style.cursor = "grabbing";
    }

    const updatePointerPosition = (pointerEvent: PointerEvent) => {
      if (!containerRef.current) {
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const originX = rect.width / 2;
      const originY = 0;

      state.current.dragX = pointerEvent.clientX - rect.left - originX;
      state.current.dragY = pointerEvent.clientY - rect.top - originY;
    };

    const handlePointerUp = () => {
      state.current.isDragging = false;

      if (boxRef.current) {
        boxRef.current.style.cursor = "grab";
      }

      window.removeEventListener("pointermove", updatePointerPosition);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    updatePointerPosition(event.nativeEvent);

    window.addEventListener("pointermove", updatePointerPosition);
    window.addEventListener("pointerup", handlePointerUp);
  };

  return (
    <div
      ref={containerRef}
      className="relative -mt-4 flex h-87.5 w-75 justify-center"
    >
      <svg className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-visible">
        <line
          ref={ropeRef}
          x1="150"
          y1="0"
          x2="150"
          y2="180"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="text-foreground/20"
        />
        <circle
          cx="150"
          cy="0"
          r="5"
          fill="currentColor"
          className="text-foreground/40"
        />
        <circle
          cx="150"
          cy="0"
          r="2"
          fill="currentColor"
          className="text-background"
        />
      </svg>

      <div
        ref={boxRef}
        onPointerDown={handlePointerDown}
        className="group absolute top-0 flex w-35 cursor-grab select-none flex-col items-center justify-center rounded-2xl border border-foreground/10 bg-background/40 p-4 shadow-2xl backdrop-blur-md transition-colors duration-300 hover:bg-background/60"
        style={{
          left: "50%",
          marginLeft: "-70px",
          transformOrigin: "center top",
          touchAction: "none",
        }}
      >
        <div className="mb-3 flex size-20 items-center justify-center overflow-hidden rounded-full border border-foreground/20 bg-foreground/5 transition-colors duration-300 pointer-events-none group-hover:border-foreground/40">
          <User className="size-10 text-foreground/40 transition-colors duration-300 group-hover:text-foreground/70" />
        </div>

        <div className="pointer-events-none flex flex-col items-center gap-1">
          <span className="text-xs font-bold tracking-[0.2em] text-foreground/80">
            HAEJUN
          </span>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Front Developer
          </span>
        </div>

        <div className="absolute left-1/2 top-0 -mt-1 size-2.5 -translate-x-1/2 rounded-full border-2 border-foreground/20 bg-background" />
      </div>
    </div>
  );
}
