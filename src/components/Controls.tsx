import { type ChangeEvent, type RefObject } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Download, Upload } from "lucide-react";

interface ImageState {
  template: string;
  heading: string;
  text: string;
  localImage: string | null;
  pagenumber: string;
  isDragging: boolean;
  dragOffset: { x: number; y: number };
  position: { x: number; y: number };
  scale: number;
  imageSize: { width: number; height: number };
  textHeight: { heading: number; text: number };
}

interface Refs {
  fileInput: RefObject<HTMLInputElement>;
  container: RefObject<HTMLDivElement>;
  preview: RefObject<HTMLDivElement>;
  image: RefObject<HTMLImageElement>;
  heading: RefObject<HTMLHeadingElement>;
  text: RefObject<HTMLParagraphElement>;
}

interface ControlsProps {
  imageState: ImageState;
  setImageState: React.Dispatch<React.SetStateAction<ImageState>>;
  refs: Refs;
  handleFileUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  handleDownload: () => Promise<void>;
}

export const Controls: React.FC<ControlsProps> = ({
  imageState,
  setImageState,
  refs,
  handleFileUpload,
  handleDownload,
}) => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-4xl font-black">Alliance Template Generator</h2>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Template</label>
        <Select
          value={imageState.template}
          onValueChange={(value: string) =>
            setImageState((prev) => ({ ...prev, template: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select template" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="campus-chronicles">Campus Chronicles</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Upload Image</label>
        <Button
          onClick={() => refs.fileInput.current?.click()}
          variant="outline"
          className="w-full"
        >
          <Upload className="mr-2 h-4 w-4" />
          {imageState.localImage ? "Change Image" : "Upload Image"}
        </Button>
        <input
          type="file"
          ref={refs.fileInput}
          onChange={handleFileUpload}
          accept="image/*"
          className="hidden"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Heading</label>
        <Input
          type="text"
          placeholder="Enter heading"
          value={imageState.heading}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setImageState((prev) => ({ ...prev, heading: e.target.value }))
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Text</label>
        <Textarea
          placeholder="Enter your text"
          value={imageState.text}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setImageState((prev) => ({ ...prev, text: e.target.value }))
          }
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Page Number</label>
        <Input
          placeholder="Enter Page Number"
          value={imageState.pagenumber}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setImageState((prev) => ({
              ...prev,
              pagenumber: e.target.value,
            }))
          }
        />
      </div>

      <div className="p-4 bg-slate-900 rounded-lg">
        <p className="text-sm text-slate-200">
          • Drag image to reposition
          <br />
          • Use mouse wheel to zoom in/out
          <br /> • Enter anything to correct the alignment
        </p>
      </div>

      <Button
        onClick={handleDownload}
        className="w-full"
        disabled={!imageState.localImage}
      >
        <Download className="mr-2 h-4 w-4" />
        Download Image
      </Button>
    </div>
  );
};
