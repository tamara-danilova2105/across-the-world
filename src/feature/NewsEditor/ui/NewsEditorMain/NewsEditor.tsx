import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { Image as ImageIcon, Save, Eye } from 'lucide-react';
import styles from './NewsEditor.module.scss';
import 'react-quill/dist/quill.snow.css';
import { NewsArticle } from '../../model/types/types';
import { NewsPreview } from '../NewsPreview/NewsPreview';
import { Stack } from '@/shared/ui/Stack';

interface NewsEditorProps {
    initialArticle?: NewsArticle;
}

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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // In a real app, you would upload this to your server/CDN
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
                    <Stack gap='4' align='center'>
                        <label className={`${styles.button} ${styles.secondary}`}>
                            <ImageIcon />
                            Загрузить изображение
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className={styles.hidden}
                            />
                        </label>
                        {coverImageUrl && (
                        <div className={styles.imagePreview}>
                            <img src={coverImageUrl} alt="Cover preview" />
                        </div>
                        )}
                    </Stack>
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