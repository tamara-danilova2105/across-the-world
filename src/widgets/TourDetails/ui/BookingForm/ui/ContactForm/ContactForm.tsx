import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import styles from './ContactForm.module.scss';
import { Link } from "react-router-dom";
import { getRoutePrivacyPolicy } from "@/app/router/lib/helper";
import { SubmitHandler, useForm } from "react-hook-form";
import { data, emailRegex, phoneRegex } from "@/shared/lib/validateInput";
import { BookingData } from "../../BookingForm";

export interface FormValues {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
};

interface ContactFormProps {
    bookingData: BookingData;
    changeModal: () => void;
}

export const ContactForm = (props: ContactFormProps) => {
    // TODO - cooбщение об отправленой заявке
    const { bookingData, changeModal } = props;

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data, bookingData);
        changeModal(); //TODO
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    return (
        <form 
            className={styles.contact_form}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Text type='h3' size="24" color='blue' font='geometria500'>
                Забронировать тур
            </Text>
            <Stack max gap='8'>
                <Input 
                    label="Имя" 
                    placeholder='введите имя' 
                    register={register("firstname", {required: data.required})} 
                    error={errors?.firstname}
                />
                <Input 
                    label="Фамилия"
                    placeholder='введите фамилию' 
                    register={register("lastname", {required: data.required})} 
                    error={errors?.lastname}
                />
            </Stack>

            <Input 
                label="Электронная почта"
                placeholder='введите email'
                type="email"
                register={register("email", {
                    required: data.required,
                    pattern: {
                        value: emailRegex,
                        message: data.errors.validEmail
                    }
                })} 
                error={errors?.email}
            />
            <Input 
                label="Номер телефона"
                placeholder='введите номер телефона'
                register={register("phone", {
                    required: data.required,
                    pattern: {
                        value: phoneRegex,
                        message: data.errors.validPhone
                    }
                })} 
                error={errors?.phone}
            />
            <Button>
                Заказать тур
            </Button>
            <Text>
                Отправляя форму вы  выражаете свое согласие на {" "} 
                <Link 
                        to={getRoutePrivacyPolicy()}
                        style={{ 
                            textDecoration: "underline",
                            textDecorationThickness: "1px",
                            textUnderlineOffset: "5px",
                            color: 'black'
                        }}
                    >
                        обработку персональных данных.
                    </Link>
            </Text>
        </form>
    );
};