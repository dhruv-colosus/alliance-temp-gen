import { useRef, useEffect, useCallback } from "react";
import domtoimage from "dom-to-image";
import { useImageState } from "../hooks/useImageState";
import { useImageDrag } from "../hooks/useImageDrag";
import { useImageZoom } from "../hooks/useImageZoom";
import { getTemplateStyles } from "./TemplateStyles";
import { ImagePreview } from "./ImagePreview";
import { Controls } from "./Controls";

const ImageGen = () => {
  const [imageState, setImageState] = useImageState();

  const refs = {
    container: useRef(null),
    preview: useRef(null),
    image: useRef(null),
    fileInput: useRef(null),
    heading: useRef(null),
    text: useRef(null),
  };

  const PREVIEW_SIZE = 600;

  const styles = getTemplateStyles(imageState.template);

  const { handleMouseDown, handleMouseMove, handleMouseUp } = useImageDrag(
    refs,
    setImageState
  );
  useImageZoom(refs, setImageState);

  const calculateTextPositions = useCallback(() => {
    const headingHeight = refs.heading.current?.offsetHeight || 0;
    const textContentHeight = refs.text.current?.offsetHeight || 0;
    setImageState((prev) => ({
      ...prev,
      textHeight: { heading: headingHeight, text: textContentHeight },
    }));
  }, [setImageState]);

  useEffect(() => {
    calculateTextPositions();
  }, [imageState.heading, imageState.text, calculateTextPositions]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setImageState((prev) => ({
          ...prev,
          imageSize: { width: img.width, height: img.height },
          localImage: e.target.result,
          position: { x: 0, y: 0 },
          scale: 1,
        }));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const calculateInitialScale = useCallback(
    (imgWidth, imgHeight, containerSize) => {
      const scaleX = containerSize / imgWidth;
      const scaleY = containerSize / imgHeight;
      return Math.min(scaleX, scaleY);
    },
    []
  );

  const handleDownload = async () => {
    if (!imageState.localImage || !refs.preview.current) {
      alert("Please upload an image first");
      return;
    }

    try {
      const scale = window.devicePixelRatio;
      const node = refs.preview.current;

      const style = {
        transform: "scale(" + scale + ")",
        transformOrigin: "top left",
        width: node.offsetWidth + "px",
        height: node.offsetHeight + "px",
      };

      const param = {
        height: node.offsetHeight * scale,
        width: node.offsetWidth * scale,
        quality: 1,
        style,
      };

      const dataUrl = await domtoimage.toPng(node, param);

      const link = document.createElement("a");
      link.download = "template-image.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
      alert("There was an error generating the image. Please try again.");
    }
  };

  const initialScale = imageState.imageSize.width
    ? calculateInitialScale(
        imageState.imageSize.width,
        imageState.imageSize.height,
        PREVIEW_SIZE
      )
    : 1;

  const totalContentHeight =
    imageState.textHeight.heading + imageState.textHeight.text;

  return (
    <div className="flex min-h-screen bg-slate-950">
      <div className="w-full p-6">
        <Controls
          imageState={imageState}
          setImageState={setImageState}
          refs={refs}
          handleFileUpload={handleFileUpload}
          handleDownload={handleDownload}
        />
      </div>

      <div className="w-full p-6">
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4">Preview</h3>
          <ImagePreview
            imageState={imageState}
            refs={refs}
            styles={styles}
            handleMouseDown={handleMouseDown}
            handleMouseMove={handleMouseMove}
            handleMouseUp={handleMouseUp}
            initialScale={initialScale}
            PREVIEW_SIZE={PREVIEW_SIZE}
            totalContentHeight={totalContentHeight}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageGen;
