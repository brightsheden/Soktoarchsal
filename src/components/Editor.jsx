// Importing helper modules
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// Importing core components
import QuillEditor from "react-quill";

// Importing styles
import "react-quill/dist/quill.snow.css";

const Editor = ({ description, change }) => {
  // Editor state
  const [value, setValue] = useState(description || '');

  useEffect(() => {
    setValue(description);
  }, [description]);

  // Editor ref
  const quill = useRef();

  // Handler to handle editor changes
  const handleEditorChange = (content) => {
    setValue(content);
    change(content);
  };

  // Custom image handler that inserts the image at the end of the content
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
        
        // Determine the insertion index at the end of the document
        const length = quillEditor.getLength();
        // Insert the image at the end
        quillEditor.insertEmbed(length, "image", imageUrl, "user");
        // Optionally insert a newline after the image so that subsequent text appears on a new line
        quillEditor.insertText(length + 1, "\n", "user");
        // Move the cursor to after the inserted image (or newline)
        quillEditor.setSelection(length + 2, 0);
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
        theme="snow"
        value={value}
        formats={formats}
        modules={modules}
        onChange={handleEditorChange}
        style={{
          height: "100%",
          overflow: "hidden",
        }}
      />
    </div>
  );
};

export default Editor;
