import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import Heading from '@tiptap/extension-heading'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import Blockquote from '@tiptap/extension-blockquote'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import CodeBlock from '@tiptap/extension-code-block'

export default function ProductEditor({
    content,
    setContent,
}: {
    content: string
    setContent: (content: string) => void
}) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Bold,
            Italic,
            Strike,
            Heading.configure({ levels: [1, 2, 3] }),
            BulletList,
            OrderedList,
            ListItem,
            Blockquote,
            HorizontalRule,
            CodeBlock,
        ],
        content,
        editorProps: {
            attributes: {
                class: 'min-h-[300px] prose prose-sm sm:prose lg:prose-lg px-4 py-3 focus:outline-none dark:text-gray-100 text-gray-900',
            },
        },
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML())
        },
    })

    if (!editor) return null

    return (
        <div className="space-y-2">

            <style>
                {`
                    h1, h2, h3 {
                        font-weight: bold;
                        margin-top: 1rem;
                        margin-bottom: 0.5rem;
                    }

                    h1 {
                        font-size: 2.5rem;
                    }

                    h2 {
                        font-size: 2rem;
                    }

                    h3 {
                        font-size: 1.5rem;
                    }
                `}
            </style>

            <div className="flex flex-wrap gap-2 bg-gray-50 dark:bg-gray-800 p-2 rounded-md border dark:border-gray-600">
                <button onClick={() => editor.chain().focus().toggleBold().run()} className={buttonClass(editor.isActive('bold'))}>B</button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()} className={buttonClass(editor.isActive('italic'))}>I</button>
                <button onClick={() => editor.chain().focus().toggleStrike().run()} className={buttonClass(editor.isActive('strike'))}>S</button>
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={buttonClass(editor.isActive('heading', { level: 1 }))}>H1</button>
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={buttonClass(editor.isActive('heading', { level: 2 }))}>H2</button>
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={buttonClass(editor.isActive('heading', { level: 3 }))}>H3</button>
                <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={buttonClass(editor.isActive('bulletList'))}>• List</button>
                <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={buttonClass(editor.isActive('orderedList'))}>1. List</button>
                <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={buttonClass(editor.isActive('blockquote'))}>❝</button>
                <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={buttonClass(editor.isActive('codeBlock'))}>Code</button>
                <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className={buttonClass(false)}>―</button>
                <button onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()} className="px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm">Clear</button>
            </div>

            <div className="border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}

function buttonClass(active: boolean) {
    return `px-2 py-1 rounded text-sm ${active
        ? 'bg-blue-500 text-white'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200'
        }`
}
