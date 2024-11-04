import { useCallback, useEffect } from "react";

interface ImageState {
  heading: string;
  text: string;
  localImage: any;
  isDragging: boolean;
  dragOffset: { x: number; y: number };
  position: { x: number; y: number };
  scale: number;
  imageSize: { width: number; height: number };
  textHeight: { heading: number; text: number };
  pagenumber: string;
  template: string;
}

interface Refs {
  container: React.RefObject<HTMLDivElement>;
}

type SetImageState = React.Dispatch<React.SetStateAction<ImageState>>;

export const useImageZoom = (refs: Refs, setImageState: SetImageState) => {
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY * -0.01;

      setImageState((prev) => ({
        ...prev,
        scale: Math.min(Math.max(0.1, prev.scale + delta), 10),
      }));
    },
    [setImageState]
  );

  useEffect(() => {
    const container = refs.container.current;
    if (!container) return;

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [handleWheel, refs]);
};
