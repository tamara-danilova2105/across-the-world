import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { Input } from "@/shared/ui/Input";
import { data } from "@/shared/lib/validateInput";
import { Button } from "@/shared/ui/Button";
import { TextArea } from "@/shared/ui/TextArea";
import { Review } from "@/entities/Review";
import { useAddReviewMutation } from "@/entities/Review/api/api";
import { TourSelect } from "@/entities/Tours";
import styles from './AddNewReview.module.scss';

type TypeReviewRequest = Omit<Review, '_id' | 'createdAt'>;

export const AddNewReview = () => {

    const [addReview, { isLoading, error }] = useAddReviewMutation();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onSubmit: SubmitHandler<TypeReviewRequest> = async (data) => {
        setIsSubmitted(false);
        try {
            await addReview(data).unwrap();
            setIsSubmitted(true);
        } catch (err) {
            setIsSubmitted(false);
        }
    };

    const {
        register,
        handleSubmit,
        setValue,
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

                <TourSelect<Review>
                    register={register}
                    error={errors.tourId}
                    name="tourId"
                    setValue={setValue}
                />

                <TextArea
                    label="Ваш отзыв"
                    placeholder='расскажите о вашем опыте путешествия...'
                    rows={8}
                    register={register("feedback", { required: data.required })}
                    error={errors?.feedback}
                    maxLength={5}
                />

                <Button loading={isLoading} disabled={isLoading}>
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