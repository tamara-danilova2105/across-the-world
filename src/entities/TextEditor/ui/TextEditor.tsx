import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import { Bold, Italic, Strikethrough, List, ListOrdered, Heading3 } from 'lucide-react';
import styles from './TextEditor.module.scss';
import { getStyles } from '@/shared/lib/getStyles';

interface TextEditorProps {
    initialContent?: string;
    isError?: boolean;
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

export function TextEditor(props: TextEditorProps) {
    const { initialContent = '', isError, onChange } = props;

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: false,
                orderedList: false,
                listItem: false,
            }),
            BulletList,
            OrderedList,
            ListItem.configure({ HTMLAttributes: { class: "list-item" } }),
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
        onCreate: ({ editor }) => {
            if (initialContent) {
                editor.commands.setContent(initialContent, false);
            }
        },
    });

    useEffect(() => {
        if (editor && initialContent && editor.getHTML() !== initialContent) {
            editor.commands.setContent(initialContent, false);
        }
    }, [initialContent, editor]);

    if (!editor) {
        return null;
    }

    return (
        <div className={getStyles(styles.container, { [styles.error]: isError }, [])}>
            <div className={styles.toolbar}>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
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

                <div className={styles.flexGrow} />
            </div>

            <div className={styles.editorContainer}>
                <EditorContent editor={editor} />
            </div>
        </div>
    );
};
