
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import styles from './FullRegionEditor.module.scss';
import { Select } from "@/shared/ui/Select";
import { DirectionTour, Region } from "@/entities/Tours";
import { Button } from "@/shared/ui/Button";
import { Check, Pencil, PlusCircle, Search, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useDeleteRegionMutation, useGetRegionsQuery, useSaveRegionMutation, useUpdateRegionMutation } from "@/entities/Region";
import { Skeleton } from "@/shared/ui/Skeleton";

export const FullRegionEditor = () => {
    const [items, setItems] = useState<Region[]>([]);
    const [newItemName, setNewItemName] = useState('');
    const [newItemDirection, setNewItemDirection] = useState<'Россия' | 'Заграница'>('Россия');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingName, setEditingName] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [directionFilter, setDirectionFilter] = useState<'Все' | 'Россия' | 'Заграница'>('Все');

    //TODO - обработка isLoading удаления и обновления
    const { data: regions, isLoading: isGetRegionsLoading, error } = useGetRegionsQuery({});
    const [saveRegion, { isLoading: isSaveLoading }] = useSaveRegionMutation();
    const [deleteRegion, { isLoading: isDeleteLoading }] = useDeleteRegionMutation();
    const [updateRegion, { isLoading: isUpdateLoading }] = useUpdateRegionMutation();

    useEffect(() => {
        if (regions) setItems(regions);
    }, [regions]);

    const directionOptions: DirectionTour[] = ["Россия", "Заграница"];

    const filteredItems = useMemo(() => {
        return items.filter(item => {
            const matchesSearch = item.region.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesDirection = directionFilter === 'Все' || item.direction === directionFilter;
            return matchesSearch && matchesDirection;
        });
    }, [items, searchQuery, directionFilter]);

    const handleAddRegion = async () => {
        try {
            await saveRegion({ direction: newItemDirection, region: newItemName }).unwrap();
            toast.success("Регион успешно добавлен");
            setNewItemName('');
        } catch (error) {
            toast.error('Произошла ошибка при добавлении региона');
        }
    };

    const handleEdit = (item: Region) => {
        if (item._id) setEditingId(item._id);
        setEditingName(item.region);
    };


    const handleSaveEdit = async () => {
        if (editingName.trim() && editingId) {
            try {
                await updateRegion({ regionId: editingId, direction: newItemDirection, region: editingName }).unwrap();
                toast.success("Регион успешно обновлен");
                setEditingId(null);
                setEditingName('');
            } catch (error) {
                toast.error('Произошла ошибка при обновлении региона');
            }
        }
    };

    const handleDelete = async (regionId: string) => {
        const isConfirmed = window.confirm("Вы уверены, что хотите удалить этот регион?");
        if (!isConfirmed) return;

        try {
            await deleteRegion(regionId).unwrap();
            toast.success("Регион успешно удален");
        } catch (error) {
            toast.error('Произошла ошибка при удалении региона');
        }
    };

    return (
        <Stack direction='column' gap='16'>
            <Text type='h2' color='blue' size='24' font='geometria500'>
                Управление регионами
            </Text>

            <Stack direction='column' gap="8" max>
                <Text type='h3' size='18'>
                    Добавить новый регион:
                </Text>
                <Stack gap="16" max align='center' className={styles.add_container}>
                    <input
                        type="text"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        className={styles.input}
                        placeholder="Введите название региона..."
                    />
                    <Select
                        value={newItemDirection}
                        options={directionOptions}
                        onChange={(options: string) => setNewItemDirection(options as DirectionTour)}
                    />
                    <Button
                        type='button'
                        onClick={handleAddRegion}
                        loading={isSaveLoading}
                        className={styles.btn}
                    >
                        <PlusCircle size={20} /> добавить
                    </Button>
                </Stack>
            </Stack>

            <Stack direction='column' gap="8" max>
                <Text type='h3' size='18'>
                    Список регионов:
                </Text>
                <Stack gap="16" max className={styles.filter_main}>
                    <div className={styles.filter_container}>
                        <Search className={styles.searchIconWrapper} size={20} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Поиск по названию..."
                            className={styles.input}
                        />
                    </div>
                    <Select
                        options={['Все', 'Россия', 'Заграница']}
                        value={directionFilter}
                        onChange={(options: string) => setDirectionFilter(options as 'Все' | 'Россия' | 'Заграница')}
                    />
                </Stack>
            </Stack>

            {isGetRegionsLoading && (
                Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton key={index} width="100%" height="52px" />
                ))
            )}

            {error && (
                <Text color="red" size="18">
                    Произошла ошибка при загрузке данных
                </Text>
            )}

            <div className={styles.resultsCount}>
                Найдено результатов: {filteredItems?.length}
            </div>

            <Stack direction='column' gap='8' max>
                {filteredItems?.map((item: Region) => (
                    <Stack
                        key={item._id} className={styles.item}
                        align='center' gap='8' max
                    >
                        {editingId === item._id ? (
                            <>
                                <input
                                    type="text"
                                    value={editingName}
                                    onChange={(e) => setEditingName(e.target.value)}
                                    className={styles.inputEdit}
                                />
                                <button
                                    onClick={handleSaveEdit}
                                    className={`${styles.button} ${styles.buttonGreen}`}
                                    title="Сохранить"
                                    disabled={isUpdateLoading}

                                >
                                    <Check size={20} />
                                </button>
                                <button
                                    onClick={() => setEditingId(null)}
                                    className={`${styles.button} ${styles.buttonRed}`}
                                    title="Отменить"
                                >
                                    <X size={20} />
                                </button>
                            </>
                        ) : (
                            <>
                                <span className={styles.itemText}>{item.region}</span>
                                <span
                                    className={`${styles.badge} ${item.direction === 'Россия' ? styles.badgeRussia : styles.badgeForeign}`}
                                >
                                    {item.direction}
                                </span>
                                <button
                                    onClick={() => handleEdit(item)}
                                    className={`${styles.button} ${styles.buttonBlue}`}
                                    title="Редактировать"
                                >
                                    <Pencil size={20} />
                                </button>
                                <button
                                    onClick={() => item._id && handleDelete(item._id)}
                                    className={`${styles.button} ${styles.buttonRed}`}
                                    title="Удалить"
                                    disabled={isDeleteLoading}
                                >
                                    <Trash2 size={20} />
                                </button>
                            </>
                        )}
                    </Stack>
                ))}
            </Stack>
        </Stack>
    );
};