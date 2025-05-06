import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'

const MenuBar = ({ editor }) => {
    if (!editor) return null

    const buttonClasses =
        'px-3 py-1.5 rounded-md border border-gray-300 bg-white text-sm hover:bg-blue-50 hover:border-blue-300 transition-all'

    return (
        <div className="flex flex-wrap gap-2 mb-4">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`${buttonClasses} ${editor.isActive('bold') ? 'bg-blue-100 border-blue-400' : ''}`}
            >
                Bold
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`${buttonClasses} ${editor.isActive('italic') ? 'bg-blue-100 border-blue-400' : ''}`}
            >
                Italic
            </button>
            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`${buttonClasses} ${editor.isActive('underline') ? 'bg-blue-100 border-blue-400' : ''}`}
            >
                Underline
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`${buttonClasses} ${editor.isActive('heading', { level: 1 }) ? 'bg-blue-100 border-blue-400' : ''}`}
            >
                H1
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`${buttonClasses} ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-100 border-blue-400' : ''}`}
            >
                H2
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`${buttonClasses} ${editor.isActive('bulletList') ? 'bg-blue-100 border-blue-400' : ''}`}
            >
                • List
            </button>
        </div>
    )
}

const WysiwygEditor = () => {
    const editor = useEditor({
        extensions: [StarterKit, Underline],
        content: '<p>Hello <strong>world!</strong></p>',
    })

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 border border-gray-200">
            <MenuBar editor={editor} />
            <div className="rounded-md border border-gray-300 p-4 min-h-[200px] prose focus:outline-none">
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}

export default WysiwygEditor
