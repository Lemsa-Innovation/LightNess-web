import Quill from "quill";
import { forwardRef, use, useEffect, useRef } from "react";
import { Control, useController } from "react-hook-form";
import "quill/dist/quill.snow.css";
import TurndownService from "turndown";
import { marked } from "marked";

// Editor is an uncontrolled React component
type EditorProps = {
  readOnly?: boolean;
  control: Control<any>;
  name: string;
  defaultValue?: string;
};

const turndownService = new TurndownService();

const Editor = forwardRef<Quill, EditorProps>(
  ({ readOnly, control, name, defaultValue }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<Quill | null>(null);

    const {
      field: { onChange },
    } = useController({
      control,
      name,
    });

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      // Clean up previous editor
      container.innerHTML = "";

      const editorContainer = container.appendChild(
        container.ownerDocument.createElement("div")
      );
      const quill = new Quill(editorContainer, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
            ["clean"],
            ["link", "image"],
          ],
        },
        readOnly,
      });

      quillRef.current = quill;
      if (ref && "current" in ref) {
        ref.current = quill;
      }
      // const html = use(marked(value));
      const html = defaultValue ? (marked(defaultValue) as string) : "";

      // Set initial value (HTML -> Quill)
      quill.root.innerHTML = html;

      quill.on(Quill.events.TEXT_CHANGE, () => {
        const html = quill.root.innerHTML;
        const markdown = turndownService.turndown(html);
        onChange(markdown); // Always emit HTML
      });

      return () => {
        if (ref && "current" in ref) ref.current = null;
        quillRef.current = null;
        container.innerHTML = "";
      };
    }, [ref, onChange, defaultValue, readOnly]);

    return <div ref={containerRef} className="h-[400px] "></div>;
  }
);

Editor.displayName = "Editor";

export default Editor;
