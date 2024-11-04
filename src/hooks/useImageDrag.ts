import { useCallback } from "react";

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

export const useImageDrag = (refs: Refs, setImageState: SetImageState) => {
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<Element>) => {
      if (e.button !== 0) return;
      const rect = refs.container.current?.getBoundingClientRect();
      if (!rect) return;

      setImageState((prev) => ({
        ...prev,
        isDragging: true,
        dragOffset: {
          x: e.clientX - (rect.left + prev.position.x),
          y: e.clientY - (rect.top + prev.position.y),
        },
      }));
    },
    [refs, setImageState]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<Element>) => {
      if (!refs.container.current) return;

      setImageState((prev) => {
        if (!prev.isDragging) return prev;
        const rect = refs.container.current?.getBoundingClientRect() || {
          left: 0,
          top: 0,
        };
        const x = e.clientX - rect.left - prev.dragOffset.x;
        const y = e.clientY - rect.top - prev.dragOffset.y;
        return {
          ...prev,
          position: { x, y },
        };
      });
    },
    [refs, setImageState]
  );

  const handleMouseUp = useCallback(() => {
    setImageState((prev) => ({ ...prev, isDragging: false }));
  }, [setImageState]);

  return { handleMouseDown, handleMouseMove, handleMouseUp };
};
