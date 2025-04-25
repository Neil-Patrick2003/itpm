import React, { useState, useRef } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default function WysiwygEditor({ value = '', onChange }) {
    const quillRef = useRef()

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['blockquote', 'code-block'],
            ['link', 'image'],
            ['clean'],
        ],
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet',
        'blockquote', 'code-block',
        'link', 'image',
    ]

    return (
        <div className="border border-dashed border-gray-300 rounded-md p-4 shadow-sm">
            <ReactQuill
                ref={quillRef}
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                placeholder="Start writing here..."
            />
        </div>
    )
}
