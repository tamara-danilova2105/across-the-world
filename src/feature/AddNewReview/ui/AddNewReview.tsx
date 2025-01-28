import { Stack } from "@/shared/ui/Stack";
import styles from './AddNewReview.module.scss';
import { Text } from "@/shared/ui/Text";
import { Input } from "@/shared/ui/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { data } from "@/shared/lib/validateInput";
import { Review } from "@/widgets/TourDetails/model/types/types";
import { Button } from "@/shared/ui/Button";

// _id: string;
// name: string;
// date: string;
// feedback: string;
// city?: string;

export const AddNewReview = () => {
    const onSubmit: SubmitHandler<Omit<Review, '_id'>> = (data) => {
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

                {/* TODO - выпадающий список */}
                <Input
                    label="Направление"
                    placeholder='выберите направление'
                />

                {/* TODO - Label + стиль */}
                <textarea
                    placeholder='расскажите о вашем опыте путешествия...'
                    rows={8}
                />

                <Button>
                    Отправить отзыв
                </Button>
            </form>
        </Stack>
    );
};