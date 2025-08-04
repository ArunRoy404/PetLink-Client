import React from "react";
import {
    Heading1,
    Heading2,
    Heading3,
    Type,
    Bold,
    Italic,
    Strikethrough,
    Highlighter,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    List,
    ListOrdered,
} from "lucide-react";

const EditorMenuBar = ({editor}) => {
    if (!editor) return null;

    const options = [
        {
            icon: <Heading1 size={18} />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            active: () => editor.isActive("heading", { level: 1 }),
        },
        {
            icon: <Heading2 size={18} />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            active: () => editor.isActive("heading", { level: 2 }),
        },
        {
            icon: <Heading3 size={18} />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            active: () => editor.isActive("heading", { level: 3 }),
        },
        {
            icon: <Type size={18} />,
            onClick: () => editor.chain().focus().setParagraph().run(),
            active: () => editor.isActive("paragraph"),
        },
        {
            icon: <Bold size={18} />,
            onClick: () => editor.chain().focus().toggleBold().run(),
            active: () => editor.isActive("bold"),
        },
        {
            icon: <Italic size={18} />,
            onClick: () => editor.chain().focus().toggleItalic().run(),
            active: () => editor.isActive("italic"),
        },
        {
            icon: <Strikethrough size={18} />,
            onClick: () => editor.chain().focus().toggleStrike().run(),
            active: () => editor.isActive("strike"),
        },
        {
            icon: <Highlighter size={18} />,
            onClick: () => editor.chain().focus().toggleHighlight().run(),
            active: () => editor.isActive("highlight"),
        },
        {
            icon: <List size={18} />,
            onClick: () => editor.chain().focus().toggleBulletList().run(),
            active: () => editor.isActive("bulletList"),
        },
        {
            icon: <ListOrdered size={18} />,
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
            active: () => editor.isActive("orderedList"),
        },
        {
            icon: <AlignLeft size={18} />,
            onClick: () => editor.chain().focus().setTextAlign("left").run(),
            active: () => editor.isActive({ textAlign: "left" }),
        },
        {
            icon: <AlignCenter size={18} />,
            onClick: () => editor.chain().focus().setTextAlign("center").run(),
            active: () => editor.isActive({ textAlign: "center" }),
        },
        {
            icon: <AlignRight size={18} />,
            onClick: () => editor.chain().focus().setTextAlign("right").run(),
            active: () => editor.isActive({ textAlign: "right" }),
        },
        {
            icon: <AlignJustify size={18} />,
            onClick: () => editor.chain().focus().setTextAlign("justify").run(),
            active: () => editor.isActive({ textAlign: "justify" }),
        },
    ];

    return (
        <div className="flex flex-wrap gap-2 p-1 border-b border-gray-300 dark:border-gray-700">
            {
                options.map((option, index) => {
                    return <button
                    type="button"
                        onClick={option.onClick}
                        key={index}
                        className={`rounded-md p-1 hover:bg-gray-200 transition-colors ${option.active() ? 'bg-gray-300' : ''}`}
                    >
                        {option.icon}
                    </button>
                })
            }
        </div>
    );
};


export default EditorMenuBar;