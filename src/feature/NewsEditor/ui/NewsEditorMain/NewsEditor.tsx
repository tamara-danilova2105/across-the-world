import { useState } from 'react';
import ReactQuill from 'react-quill';
import { Save, Eye } from 'lucide-react';
import { ImageUploader } from '@/entities/ImageUploader';
import { NewsArticle } from '../../model/types/types';
import { NewsPreview } from '../NewsPreview/NewsPreview';
import styles from './NewsEditor.module.scss';

interface NewsEditorProps {
    initialArticle?: NewsArticle;
}

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
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

export function NewsEditor({
    initialArticle
}: NewsEditorProps) {
    const [article, setArticle] = useState<NewsArticle>(initialArticle || {
        id: crypto.randomUUID(),
        title: '',
        content: '',
        excerpt: '',
        publishDate: new Date(),
        status: 'draft',
        author: 'Admin', // This should come from auth context in a real app
    });
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [coverImageUrl, setCoverImageUrl] = useState(article.coverImage || '');

    const handleSave = () => {
        console.log('handleSave');
    };

    const handleImageChange = (file: File | null) => {
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setCoverImageUrl(imageUrl);
        }
    };

    if (isPreviewMode) {
        return (
            <div className={styles.container}>
                <NewsPreview article={article} />
                <button
                    className={`${styles.button} ${styles.secondary}`}
                    onClick={() => setIsPreviewMode(false)}
                >
                    Back to Editor
                </button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="title" className={styles.label}>
                        Заголовок
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={article.title}
                        onChange={(e) => setArticle(prev => ({ ...prev, title: e.target.value }))}
                        className={styles.input}
                        placeholder="Введите заголовок статьи"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        Изображение для обложки
                    </label>
                    <ImageUploader
                        imageUrl={coverImageUrl}
                        onImageChange={handleImageChange}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        Статья
                    </label>
                    <ReactQuill
                        value={article.content}
                        onChange={(content) => setArticle(prev => ({ ...prev, content }))}
                        modules={modules}
                        formats={formats}
                        theme="snow"
                        style={{ height: '200px' }}
                    />
                </div>

                <div className={styles.toolbar}>
                    <button
                        onClick={handleSave}
                        className={`${styles.button} ${styles.primary}`}
                    >
                        <Save />
                        Сохранить
                    </button>
                    <button
                        onClick={() => setIsPreviewMode(true)}
                        className={`${styles.button} ${styles.secondary}`}
                    >
                        <Eye />
                        Просмотреть
                    </button>
                </div>
            </form>
        </div>
    );
}