import {
    Calendar,
    MoreVertical,
    Link,
    Copy,
    Trash2,
    Globe,
    Globe as GlobeOff,
    Edit
} from 'lucide-react';
import styles from './TourCardAdmin.module.scss';
import { useState } from 'react';
import { Select } from '@/shared/ui/Select';
import { Button } from '@/shared/ui/Button';
import { Stack } from '@/shared/ui/Stack';
import { DateTours } from '@/widgets/OurTours/lib/data'; //TODO public api
import { formatDateRange } from '@/shared/lib/formatDateRange';

interface TourCardAdminProps {
    tourId: string;
    title: string;
    imageUrl: string;
    dates: DateTours[];
}

const TOTAL_SPOTS = 15;

export const TourCardAdmin = (props: TourCardAdminProps) => {
    const { tourId, title, imageUrl, dates } = props;

    const [formData, setFormData] = useState(dates);
    
    const formattedDates = formData.map(date => ({
        id: date._id,
        spots: date.spots,
        option: formatDateRange(date.date_start, date.date_finish)
    }));

    const [selectedDateInfo, setSelectedDateInfo] = useState({
        id: formData[0]._id,
        date: formattedDates[0].option,
        spots: formData[0].spots
    });

    const [showMenu, setShowMenu] = useState(false);
    const [isPublished, setIsPublished] = useState(true);

    const handleDateChange = (option: string) => {
        const selected = formattedDates.find(d => d.option === option);
        if (selected) {
            setSelectedDateInfo(prev => ({
                ...prev,
                id: selected.id,
                date: option,
                spots: selected.spots
            }));
        }
    };

    const handleSpotsChange = (spots: number) => {
        setSelectedDateInfo(prev => ({
            ...prev,
            spots
        }));
    };

    const handleSave = () => {
        const updatedFormData = formData.map(item =>
            item._id === selectedDateInfo.id ? { ...item, spots: selectedDateInfo.spots } : item
        );

        setFormData(updatedFormData);

        console.log('Tour:', tourId);
        console.log('Saved:', updatedFormData);
    };

    const togglePublished = () => {
        setIsPublished(!isPublished);
        setShowMenu(false);
    };

    return (
        <div className={styles.card}>
            <div
                className={styles.menuWrapper}
                onMouseEnter={() => setShowMenu(true)}
                onMouseLeave={() => setShowMenu(false)}
            >
                <button className={styles.menuButton}>
                    <MoreVertical className={styles.menuIcon} />
                </button>

                {showMenu && (
                    <div className={styles.dropdownMenu}>
                        <button className={styles.menuItem}>
                            <Link className={styles.icon} />
                            Ссылка на оплату
                        </button>
                        <button className={styles.menuItem}>
                            <Copy className={styles.icon} />
                            Создать копию тура
                        </button>
                        <button className={styles.menuItem}>
                            <Edit className={styles.icon} />
                            Редактировать
                        </button>
                        <button onClick={togglePublished} className={styles.menuItem}>
                            {isPublished ? (
                                <>
                                    <GlobeOff className={styles.icon} />
                                    Снять с публикации
                                </>
                            ) : (
                                <>
                                    <Globe className={styles.icon} />
                                    Опубликовать
                                </>
                            )}
                        </button>
                        <button className={styles.deleteItem}>
                            <Trash2 className={styles.icon} />
                            Удалить
                        </button>
                    </div>
                )}
            </div>

            <div className={styles.imageWrapper}>
                <img src={imageUrl} alt={title} className={styles.image} />
                {isPublished && (
                    <div className={styles.publishedLabel}>Опубликовано</div>
                )}
            </div>

            <Stack className={styles.content} direction='column' gap='16'>
                <h3 className={styles.title}>{title}</h3>

                <Stack align='center' max gap='16'>
                    <Calendar className={styles.icon} />

                    <Select
                        value={selectedDateInfo.date}
                        options={formattedDates.map(date => date.option)}
                        onChange={(option: string) => handleDateChange(option)}
                    />
                </Stack>

                <Stack gap='8' justify='between' align='center' max>
                    <span>Мест осталось:</span>
                    <div className={styles.spots_select}>
                        <Select
                            value={selectedDateInfo.spots}
                            options={Array.from({ length: TOTAL_SPOTS + 1 }, (_, i) => i)}
                            onChange={handleSpotsChange}
                        />
                    </div>
                    <span>из {TOTAL_SPOTS}</span>
                </Stack>

                <Button onClick={handleSave}>
                    Сохранить
                </Button>
            </Stack>
        </div>
    );
};