import { useState } from "react";

export const useImageState = () => {
  const [imageState, setImageState] = useState({
    heading: "",
    text: "",
    localImage: null,
    isDragging: false,
    dragOffset: { x: 0, y: 0 },
    position: { x: 0, y: 0 },
    scale: 1,
    imageSize: { width: 0, height: 0 },
    textHeight: { heading: 0, text: 0 },
    pagenumber: "",
    template: "campus-chronicles",
  });

  return [imageState, setImageState];
};
