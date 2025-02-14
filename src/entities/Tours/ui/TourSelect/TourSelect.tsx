import { SelectApp } from "@/shared/ui/SelectApp/SelectApp";
import { Text } from "@/shared/ui/Text";
import { FieldError, FieldValues, Path, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { useMemo } from "react";
import { Tour } from "../../model/types/types";
import { useGetTourListQuery } from "../../api/api";

interface TourSelectProps<T extends FieldValues> {
    register: UseFormRegister<T>;
    setValue: UseFormSetValue<T>;
    name: Path<T>;
    error?: FieldError;
}

export const TourSelect = <T extends FieldValues>(props: TourSelectProps<T>) => {
    const { register, setValue, name, error } = props;

    const { data: tourList, isLoading, error: fetchError } = useGetTourListQuery({});

    const tourMap = useMemo(() => {
        return tourList?.reduce((acc: Record<string, string>, tour: Tour) => {
            acc[tour.tour] = tour._id;
            return acc;
        }, {});
    }, [tourList]);

    const tourOptions = useMemo(() => {
        return tourList?.map((tour: Tour) => tour.tour);
    }, [tourList]);

    const handleTourChange = (selectedTourName: string) => {
        const selectedTourId = tourMap[selectedTourName];
        setValue(name, selectedTourId);
    };

    //TODO
    if (isLoading) {
        return <Text>Загрузка туров...</Text>;
    }

    //TODO
    if (fetchError) {
        return <Text color="red">Ошибка загрузки туров</Text>;
    }

    return (
        <SelectApp
            label="Тур"
            options={tourOptions}
            placeholder="Выберите тур"
            register={register(name, {
                required: "Выберите тур",
                onChange: (e) => handleTourChange(e.target.value)
            })}
            error={error}
        />
    );
};
