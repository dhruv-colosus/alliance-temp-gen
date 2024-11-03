import { useCallback } from "react";

export const useImageDrag = (refs, setImageState) => {
  const handleMouseDown = useCallback(
    (e) => {
      if (e.button !== 0) return;
      const rect = refs.container.current.getBoundingClientRect();
      setImageState((prev) => ({
        ...prev,
        isDragging: true,
        dragOffset: {
          x: e.clientX - (rect.left + prev.position.x),
          y: e.clientY - (rect.top + prev.position.y),
        },
      }));
    },
    [refs]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!refs.container.current) return;
      setImageState((prev) => {
        if (!prev.isDragging) return prev;
        const rect = refs.container.current.getBoundingClientRect();
        const x = e.clientX - rect.left - prev.dragOffset.x;
        const y = e.clientY - rect.top - prev.dragOffset.y;
        return {
          ...prev,
          position: { x, y },
        };
      });
    },
    [refs]
  );

  const handleMouseUp = useCallback(() => {
    setImageState((prev) => ({ ...prev, isDragging: false }));
  }, [setImageState]);

  return { handleMouseDown, handleMouseMove, handleMouseUp };
};
