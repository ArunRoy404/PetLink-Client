import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Placeholder } from '@tiptap/extensions'
import EditorMenuBar from './EditorMenuBar';
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import { useEffect } from 'react';


const RichTextEditor = ({ content, onChange, className, viewOnly }) => {
    const editor = useEditor({
        editable: viewOnly !== true,
        extensions: [
            Highlight.configure({
                multicolor: true // Optional, allows multiple highlight colors
            }),
            StarterKit.configure({
                bulletList: {
                    HTMLAttributes: {
                        class: 'list-disc ml-10'
                    }
                },
                orderedList: {
                    HTMLAttributes: {
                        class: 'list-decimal ml-10'
                    }
                }
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph']
            }),
            Placeholder.configure({
                placeholder: `Tell potential adopters about:
    - Personality traits
    - Health conditions
    - Special care needs
    - Behavior with other pets/children
    - Any training received`
            })
        ],
        content: content,
        onUpdate: ({ editor }) => {
            let html = editor.getHTML()
            html = html.replace(/<p><\/p>$/, '');
            onChange(html)
        }
    })


    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content || '')
        }
    }, [editor, content])


    return (
        <div className={className}>
            {viewOnly === true ? <></> : <EditorMenuBar editor={editor} /> }
            <EditorContent
                className="p-3 pb-0 [&_.ProseMirror]:min-h-36 text-sm text-black [&_.ProseMirror:focus]:outline-none"
                editor={editor}
            />
        </div>
    );
};

export default RichTextEditor;