import { useState } from "react";

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
export const useImageState = () => {
  const [imageState, setImageState] = useState<ImageState>({
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
