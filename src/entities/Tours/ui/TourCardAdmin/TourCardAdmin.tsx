import {
    Calendar,
    MoreVertical,
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
import { formatDateRange } from '@/shared/lib/formatDateRange';
import { DateTours } from '../../model/types/types';
import { useDeleteTourMutation, useUpdateTourDetailsMutation } from '../../api/api';
import { toast } from 'react-toastify';

interface TourCardAdminProps {
    tourId: string;
    title: string;
    imageUrl: string;
    dates: DateTours[];
    isPublished: boolean;
}

const TOTAL_SPOTS = 16;

export const TourCardAdmin = (props: TourCardAdminProps) => {
    const { tourId, title, imageUrl, dates, isPublished } = props;

    const [formData, setFormData] = useState(dates);
    const [isPublishedState, setIsPublishedState] = useState(isPublished);
    const [showMenu, setShowMenu] = useState(false);

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
        setSelectedDateInfo(prev => ({ ...prev, spots }));
    };

    const [updateTourDetails, { isLoading: isLoadingUpdate }] = useUpdateTourDetailsMutation();
    const [deleteTour] = useDeleteTourMutation();

    const handleUpdateTour = async (updateData: Partial<{ dates: DateTours[]; isPublished: boolean }>) => {
        try {
            await updateTourDetails({
                id: tourId,
                updateData
            }).unwrap();

            toast.success("Данные успешно обновлены.");
        } catch (err) {
            toast.error("Ошибка при обновлении данных. Попробуйте снова.");
        }
    };

    const handleSave = () => {
        const updatedFormData = formData.map(item =>
            item._id === selectedDateInfo.id ? { ...item, spots: selectedDateInfo.spots } : item
        );

        setFormData(updatedFormData);
        handleUpdateTour({ dates: updatedFormData });
    };

    const togglePublished = () => {
        const newPublishedState = !isPublishedState;
        setIsPublishedState(newPublishedState);
        handleUpdateTour({ isPublished: newPublishedState });
        setShowMenu(false);
    };

    const handleDeleteTour = async () => {
        try {
            await deleteTour(tourId).unwrap();
            toast.success("Тур успешно удален.");
        } catch (err) {
            toast.error("Ошибка при удалении тура. Попробуйте снова.");
        }
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
                            <Copy className={styles.icon} />
                            Создать копию тура
                        </button>
                        <button className={styles.menuItem}>
                            <Edit className={styles.icon} />
                            Редактировать
                        </button>
                        <button
                            onClick={togglePublished}
                            className={styles.menuItem}
                        >
                            {isPublishedState ? (
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
                        <button
                            onClick={handleDeleteTour}
                            className={styles.deleteItem}
                        >
                            <Trash2 className={styles.icon} />
                            Удалить
                        </button>
                    </div>
                )}
            </div>

            <div className={styles.imageWrapper}>
                <img src={imageUrl} alt={title} className={styles.image} />
                {isPublishedState && <div className={styles.publishedLabel}>Опубликовано</div>}
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

                <Button
                    onClick={handleSave}
                    loading={isLoadingUpdate}
                    disabled={isLoadingUpdate}
                >
                    Сохранить
                </Button>
            </Stack>
        </div>
    );
};
