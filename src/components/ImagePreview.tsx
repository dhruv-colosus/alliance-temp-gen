import { type MouseEvent, type RefObject } from "react";

interface ImageState {
  localImage: string | null;
  position: {
    x: number;
    y: number;
  };
  scale: number;
  isDragging: boolean;
  imageSize: {
    width: number;
    height: number;
  };
  pagenumber: string;
  heading: string;
  text: string;
}

interface Refs {
  container: RefObject<HTMLDivElement>;
  preview: RefObject<HTMLDivElement>;
  image: RefObject<HTMLImageElement>;
  heading: RefObject<HTMLHeadingElement>;
  text: RefObject<HTMLParagraphElement>;
}

interface Styles {
  overlay: string;
  redline: string;
  innerPage: string;
  heading: string;
  text: string;
  innerText: string;
}

interface ImagePreviewProps {
  imageState: ImageState;
  refs: Refs;
  styles: Styles;
  handleMouseDown: (e: MouseEvent<HTMLDivElement>) => void;
  handleMouseMove: (e: MouseEvent<HTMLDivElement>) => void;
  handleMouseUp: (e: MouseEvent<HTMLDivElement>) => void;
  initialScale: number;
  PREVIEW_SIZE: number;
  totalContentHeight: number;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageState,
  refs,
  styles,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  initialScale,
  PREVIEW_SIZE,
  totalContentHeight,
}) => {
  return (
    <div
      ref={refs.container}
      className="relative bg-gray-900 rounded-lg overflow-hidden"
      style={{
        width: `${PREVIEW_SIZE}px`,
        height: `${PREVIEW_SIZE}px`,
        maxWidth: "100%",
        aspectRatio: "1/1",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {imageState.localImage ? (
        <div ref={refs.preview} className="w-full h-full">
          <img
            ref={refs.image}
            src={imageState.localImage}
            alt="Template preview"
            className="absolute transform-gpu duration-100"
            style={{
              transform: `translate(${imageState.position.x}px, ${
                imageState.position.y
              }px) scale(${imageState.scale * initialScale})`,
              transformOrigin: "0 0",
              cursor: imageState.isDragging ? "grabbing" : "grab",
              left:
                (PREVIEW_SIZE - imageState.imageSize.width * initialScale) / 2,
              top:
                (PREVIEW_SIZE - imageState.imageSize.height * initialScale) / 2,
            }}
            draggable={false}
          />
          <div className={styles.overlay} />
          <div className={styles.redline} />
          <div className={styles.innerPage}>{imageState.pagenumber || "1"}</div>
          <h2
            ref={refs.heading}
            className={styles.heading}
            style={{ bottom: `${98 + totalContentHeight / 2}px` }}
          >
            {imageState.heading || "Your Heading"}
          </h2>
          <p
            ref={refs.text}
            className={styles.text}
            style={{ bottom: `${127 - totalContentHeight / 2}px` }}
            data-text-content
          >
            <span className={styles.innerText}>
              {imageState.text || "Your text here"}
            </span>
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-400">Upload an image to see preview</p>
        </div>
      )}
    </div>
  );
};
