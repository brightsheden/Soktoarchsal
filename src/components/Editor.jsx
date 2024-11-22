// Importing helper modules
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// Importing core components
import QuillEditor from "react-quill";

// Importing styles
import "react-quill/dist/quill.snow.css";
//import styles from "./styles.module.css";

const Editor = ({ description, change }) => {
  // Editor state
  const [value, setValue] = useState(description || '');

  useEffect(() => {
    setValue(description);
  }, [description]); // Use description as dependency to update value when description changes

  // Editor ref
  const quill = useRef();

  // Handler to handle editor changes
  const handleEditorChange = (content) => {
    setValue(content);
    change(content); // Call the change function with the new content
  };

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const imageUrl = reader.result;
        const quillEditor = quill.current.getEditor();

        const range = quillEditor.getSelection(true);
        quillEditor.insertEmbed(range.index, "image", imageUrl);
      };

      reader.readAsDataURL(file);
    };
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, 4, false] }],
          ["bold", "italic", "underline", "blockquote"],
          [{ color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    [imageHandler]
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "clean",
  ];

  return (
    <div className="editor-container">
      <QuillEditor
        ref={(el) => (quill.current = el)}
        className=""
        theme="snow"
        value={value}
        formats={formats}
        modules={modules}
        onChange={handleEditorChange} 
        style={{
          height: "300px",
          overflow: "hidden"
        }}
      />
    </div>
  );
};

export default Editor;
