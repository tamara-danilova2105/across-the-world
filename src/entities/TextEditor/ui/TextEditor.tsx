import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ImageExtension from '@tiptap/extension-image';
import { Bold, Italic, Strikethrough, List, ListOrdered, Heading3, Image } from 'lucide-react';
import styles from './TextEditor.module.scss';

interface TextEditorProps {
    initialContent?: string;
    onChange: (value: string) => void;
}

const MenuButton = ({
    onClick,
    isActive = false,
    children
}: {
    onClick: () => void;
    isActive?: boolean;
    children: React.ReactNode;
}) => (
    <button
        onClick={onClick}
        type='button'
        className={`${styles.button} ${isActive ? styles.active : ''}`}
    >
        {children}
    </button>
);

export function TextEditor({ initialContent = '', onChange }: TextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit, 
            ImageExtension,
        ],
        content: initialContent,
        editorProps: {
            attributes: {
                class: styles.editorContent,
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    if (!editor) {
        return null;
    }

    return (
        <div className={styles.container}>
            <div className={styles.toolbar}>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    isActive={editor.isActive('heading', { level: 3 })}
                >
                    <Heading3 size={18} />
                </MenuButton>

                <div className={styles.separator} />

                <MenuButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive('bold')}
                >
                    <Bold size={18} />
                </MenuButton>

                <MenuButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive('italic')}
                >
                    <Italic size={18} />
                </MenuButton>

                <MenuButton
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    isActive={editor.isActive('strike')}
                >
                    <Strikethrough size={18} />
                </MenuButton>

                <div className={styles.separator} />

                <MenuButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive('bulletList')}
                >
                    <List size={18} />
                </MenuButton>

                <MenuButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    isActive={editor.isActive('orderedList')}
                >
                    <ListOrdered size={18} />
                </MenuButton>

                <div className={styles.separator} />

                <MenuButton
                    onClick={() => {
                        const url = window.prompt('Enter the image URL:');
                        if (url) {
                            editor.chain().focus().setImage({ src: url }).run();
                        }
                    }}
                >
                    <Image size={18} />
                </MenuButton>

                <div className={styles.flexGrow} />
            </div>

            <div className={styles.editorContainer}>
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}