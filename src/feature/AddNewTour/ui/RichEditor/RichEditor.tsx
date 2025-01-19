import ReactQuill from "react-quill";
import styles from './RichEditor.module.scss';

const modules = {
    toolbar: [
        [{ 'list': 'bullet' }],
        ['bold', 'italic'],
        ['clean']
    ]
};

const formats = [
    'list',
    'bold',
    'italic'
];

interface RichEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export const RichEditor = (props: RichEditorProps) => {
    const { value, onChange, placeholder } = props;

    return (
        <ReactQuill
            theme="snow"
            value={value}
            onChange={onChange}
            modules={modules}
            formats={formats}
            placeholder={placeholder}
            className={styles.quill}
        />
    );
};