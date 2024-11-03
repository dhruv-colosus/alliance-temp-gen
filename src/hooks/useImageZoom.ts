import { useCallback, useEffect } from "react";

export const useImageZoom = (refs, setImageState) => {
  const handleWheel = useCallback(
    (e) => {
      e.preventDefault();
      const delta = e.deltaY * -0.01;
      setImageState((prev) => ({
        ...prev,
        scale: Math.min(Math.max(0.1, prev.scale + delta), 3),
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
