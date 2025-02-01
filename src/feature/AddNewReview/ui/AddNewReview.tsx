import { Stack } from "@/shared/ui/Stack";
import styles from './AddNewReview.module.scss';
import { Text } from "@/shared/ui/Text";
import { Input } from "@/shared/ui/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { data } from "@/shared/lib/validateInput";
import { Button } from "@/shared/ui/Button";
import { TextArea } from "@/shared/ui/TextArea";
import { SelectApp } from "@/shared/ui/SelectApp/SelectApp";
import { useMemo, useState } from "react";
import { dataTours, Tour } from "@/widgets/OurTours/lib/data";
import { Review } from "@/entities/Review";
import { useAddReviewMutation } from "@/entities/Review/api/api";

type TypeReviewRequest = Omit<Review, '_id' | 'createdAt'>;

export const AddNewReview = () => {
    const tourOptions = useMemo(() => dataTours.map((tour: Tour) => tour.tour), []);

    const [addReview, { isLoading, error }] = useAddReviewMutation();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onSubmit: SubmitHandler<TypeReviewRequest> = async (data) => {
        setIsSubmitted(false);
        try {
            const selectedTour = dataTours.find((tour) => tour.tour === data.tourId);
            const newData = { ...data, tourId: selectedTour?._id };

            await addReview(newData).unwrap();
            setIsSubmitted(true);
        } catch (err) {
            setIsSubmitted(false);
        }
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
                    register={register("city")}
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

                <Button loading={isLoading}>
                    Отправить отзыв
                </Button>

                {(isSubmitted || error) && (
                    <Text color={error ? 'red' : 'blue'}>
                        {error
                            ? 'Произошла ошибка при отправке отзыва. Пожалуйста, попробуйте еще раз. Если проблема сохраняется, свяжитесь с нами.'
                            : 'Ваш отзыв успешно отправлен! После модерации он будет опубликован. Спасибо, что делитесь своими впечатлениями!'
                        }
                    </Text>
                )}
            </form>
        </Stack>
    );
};