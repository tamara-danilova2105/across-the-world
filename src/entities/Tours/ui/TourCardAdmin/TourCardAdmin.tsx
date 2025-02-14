import {
    Calendar,
    MoreVertical,
    Copy,
    Trash2,
    Globe,
    Globe as GlobeOff,
    Edit
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Select } from '@/shared/ui/Select';
import { Button } from '@/shared/ui/Button';
import { Stack } from '@/shared/ui/Stack';
import { formatDateRange } from '@/shared/lib/formatDateRange';
import { apiUrl } from '@/shared/api/endpoints';
import { getStyles } from '@/shared/lib/getStyles';
import { DateTours } from '../../model/types/types';
import { useAddTourMutation, useDeleteTourMutation, useLazyGetTourByIdQuery, useUpdateTourDetailsMutation } from '../../api/api';
import styles from './TourCardAdmin.module.scss';
import { getRouteAdminToursEdit } from '@/app/router/lib/helper';
import { Link } from 'react-router-dom';

interface TourCardAdminProps {
    tourId: string;
    title: string;
    imageUrl: string;
    dates: DateTours[];
    isPublished: boolean;
}

export const TourCardAdmin = (props: TourCardAdminProps) => {
    const { tourId, title, imageUrl, dates, isPublished } = props;

    const [formData, setFormData] = useState(dates);
    const [isPublishedState, setIsPublishedState] = useState(isPublished);
    const [showMenu, setShowMenu] = useState(false);

    const [getTriggerTour] = useLazyGetTourByIdQuery();
    const [addTour] = useAddTourMutation();

    const formattedDates = formData.map(date => ({
        id: date._id,
        spots: date.spots,
        spotsTotal: date.spotsTotal,
        option: formatDateRange(date.date_start, date.date_finish)
    }));

    const [selectedDateInfo, setSelectedDateInfo] = useState({
        id: formData[0]._id,
        date: formattedDates[0].option,
        spots: formData[0].spots,
        spotsTotal: formData[0].spotsTotal,
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

    const handleSave = async () => {
        const updatedFormData = formData.map(item =>
            item._id === selectedDateInfo.id ? { ...item, spots: selectedDateInfo.spots } : item
        );

        setFormData(updatedFormData);
        try {
            await handleUpdateTour({ dates: updatedFormData });
        } catch (error) {
            toast.error("Ошибка при сохранении данных");
        }
    };

    const togglePublished = async () => {
        try {
            const newPublishedState = !isPublishedState;
            await handleUpdateTour({ isPublished: newPublishedState });
            setIsPublishedState(newPublishedState);
        } catch (error) {
            toast.error("Ошибка при изменении статуса публикации");
        }
        setShowMenu(false);
    };


    const handleDeleteTour = async () => {
        const isConfirmed = window.confirm("Вы уверены, что хотите удалить этот тур?");
        if (!isConfirmed) return;

        try {
            await deleteTour(tourId).unwrap();
            toast.success("Тур успешно удален.");
        } catch (err) {
            toast.error("Ошибка при удалении тура. Попробуйте снова.");
        }
    };

    const createCopyTour = async () => {
        try {
            const response = await getTriggerTour(tourId);
            const originalTour = response.data;

            if (!originalTour) {
                toast.error("Не удалось получить данные для создания копии");
                return;
            }

            const { _id, createdAt, updatedAt, ...tourData } = originalTour;

            const copiedTour = {
                ...tourData,
                isPublished: false,
                tour: `Копия ${originalTour.tour}`,
            };

            await addTour(copiedTour).unwrap();

            toast.success("Копия тура успешно создана");
        } catch (error) {
            toast.error("Ошибка при создании копии тура");
        }
    }

    return (
        <div className={styles.card}>
            <div
                className={styles.menuWrapper}
                onMouseEnter={() => setShowMenu(true)}
                onMouseLeave={() => setShowMenu(false)}
            >
                <button className={styles.menuButton} aria-label="Меню действий">
                    <MoreVertical className={styles.menuIcon} />
                </button>

                {showMenu && (
                    <ul className={styles.dropdownMenu} role="menu">
                        <li role="menuitem">
                            <button onClick={createCopyTour} className={styles.menuItem}>
                                <Copy className={styles.icon} />
                                Создать копию тура
                            </button>
                        </li>
                        <li role="menuitem">
                            <Link to={getRouteAdminToursEdit(tourId)} className={styles.menuItem}>
                                <Edit className={styles.icon} />
                                Редактировать
                            </Link>
                        </li>
                        <li role="menuitem">
                            <button onClick={togglePublished} className={styles.menuItem}>
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
                        </li>
                        <li role="menuitem">
                            <button onClick={handleDeleteTour} className={styles.deleteItem}>
                                <Trash2 className={styles.icon} />
                                Удалить
                            </button>
                        </li>
                    </ul>
                )}
            </div>

            <div className={styles.imageWrapper}>
                <img
                    src={`${apiUrl}${imageUrl}`} //TODO
                    alt={title} className={styles.image}
                />

                <div className={getStyles(styles.publishedLabel, { [styles.publish]: isPublished }, [])}>
                    {isPublished ? 'Опубликовано' : 'Черновик'}
                </div>

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
                            value={Number(selectedDateInfo.spots)}
                            options={Array.from({ length: Number(selectedDateInfo.spotsTotal) + 1 }, (_, i) => i)}
                            onChange={handleSpotsChange}
                        />
                    </div>
                    <span>из {Number(selectedDateInfo.spotsTotal)}</span>
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
