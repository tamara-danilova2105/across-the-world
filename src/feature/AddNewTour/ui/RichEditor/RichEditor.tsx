import ReactQuill from "react-quill";
import styles from './RichEditor.module.scss';

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent',
    'link', 'image'
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
