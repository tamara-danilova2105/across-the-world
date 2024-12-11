import { Text } from '@/shared/ui/Text';
import { NewsArticle } from '../../model/types/types';
import styles from './NewsPreview.module.scss';

interface NewsPreviewProps {
    article: NewsArticle;
}

export function NewsPreview({ article }: NewsPreviewProps) {
    return (
        <article className={styles.container}>
            <header className={styles.header}>
                <Text type='h2' size='18' className={styles.title}>
                    {article.title}
                </Text>
            </header>

            {article.coverImage && (
                <img
                    src={article.coverImage}
                    alt={article.title}
                    className={styles.coverImage}
                />
            )}

            <div 
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: article.content }}
            />
        </article>
    );
}