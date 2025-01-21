import { useState } from 'react';
import ReactQuill from 'react-quill';
import { ImageUploader } from '@/entities/ImageUploader';
import { Text } from '@/shared/ui/Text';
import { Stack } from '@/shared/ui/Stack';
import { Button } from '@/shared/ui/Button';
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
            <Stack
                direction='column' gap='32' max
                className={styles.container}
            >
                <NewsPreview article={article} />
                <Button onClick={() => setIsPreviewMode(false)}>
                    Вернуть к редактированию
                </Button>
            </Stack>
        );
    }

    return (
        <Stack
            direction='column' gap='32' max
            className={styles.container}
        >
            <Text type='h2' size='32' color='blue' font='geometria600'>
                Написать новость
            </Text>

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
                    <Button onClick={handleSave}>
                        Сохранить
                    </Button>
                    <Button
                        color='outline'
                        onClick={() => setIsPreviewMode(true)}
                    >
                        Просмотреть
                    </Button>
                </div>
            </form>
        </Stack>
    );
}