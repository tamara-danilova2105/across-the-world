import { Stack } from "@/shared/ui/Stack";
import styles from './AddNewReview.module.scss';
import { Text } from "@/shared/ui/Text";
import { Input } from "@/shared/ui/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { data } from "@/shared/lib/validateInput";
import { Button } from "@/shared/ui/Button";
import { TextArea } from "@/shared/ui/TextArea";
import { SelectApp } from "@/shared/ui/SelectApp/SelectApp";
import { useMemo } from "react";
import { dataTours, Tour } from "@/widgets/OurTours/lib/data";
import { Review } from "@/entities/Review";

type TypeReviewRequest = Omit<Review, '_id' | 'createdAt'>;

export const AddNewReview = () => {
    const tourOptions = useMemo(() => dataTours.map((tour: Tour) => tour.tour), []);

    const onSubmit: SubmitHandler<TypeReviewRequest> = (data) => {
        console.log(data);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Review>();

    return (
        <Stack
            direction="column"
            gap="16"
            className={styles.booking_form}
        >
            <Text type='h2' color='blue' font='geometria500' size="24">
                Оставьте свой отзыв
            </Text>

            <Text size="16">
                Поделитесь своими впечатлениями о путешествии
            </Text>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    label="Имя"
                    placeholder='введите имя'
                    register={register("name", { required: data.required })}
                    error={errors?.name}
                />

                <Input
                    label="Город"
                    placeholder='введите город'
                />

                <SelectApp
                    label="Тур"
                    options={tourOptions}
                    placeholder="выберите тур"
                    register={register('tourId', { required: data.required })}
                    error={errors.tourId}
                />

                <TextArea
                    label="Ваш отзыв"
                    placeholder='расскажите о вашем опыте путешествия...'
                    rows={8}
                    register={register("feedback", { required: data.required })}
                    error={errors?.feedback}
                />

                <Button>
                    Отправить отзыв
                </Button>
            </form>
        </Stack>
    );
};