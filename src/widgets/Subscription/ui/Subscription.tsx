import { Stack } from "@/shared/ui/Stack";
import { FormProvider, useForm } from "react-hook-form";
import styles from './Subscription.module.scss'
import { Text } from "@/shared/ui/Text";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { data, emailRegex } from '@/shared/lib/validateInput';
import { EnvelopeIcon } from "@/shared/assets/svg/envelopeIcon";
import { RunningLine } from "@/entities/RunningLine";

interface FormInputs {
    email: string;
}

//TODO

export const Subscription = () => {
    const methods = useForm<FormInputs>();
    const { handleSubmit, register, reset, formState: { errors } } = methods;

    const onSubmit = () => {
        reset()
    }

    return (
        <Stack 
            className={styles.subscriptionContainer} 
            align="center" 
            justify="center"
            direction="column"
        >
            <RunningLine/>
            <Stack className={styles.subscription} 
                direction="column" 
                align="center" 
                justify="center"
                gap='32'
            >
                <Stack 
                    direction="column" 
                    align="center" 
                    justify="center" 
                    gap='16'
                >
                    <Text type="h2" font='unbounded'
                    color="blue" size="32">НОВОСТИ</Text>
                    <Text font='geometria400'
                    color="blue" size="16"
                    >Получите скидку 3% на свой первый заказ, просто подписавшись на наши новости</Text>
                </Stack>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {EnvelopeIcon()}
                        <Input 
                            name="email"
                            register={register("email", {
                                required: data.required,
                                pattern: {
                                    value: emailRegex,
                                    message: data.errors.validEmail,
                                }
                            })}
                            placeholder="Введите свою почту"
                            error={errors.email}
                        />
                        <Button type="submit">
                            Подписаться
                        </Button>
                    </form>
                </FormProvider>
            </Stack>
        </Stack>
    )
}