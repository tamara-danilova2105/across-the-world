import { FormProvider, useForm } from "react-hook-form";
import { TitleSection } from "@/entities/TitleSection";
import { Text } from "@/shared/ui/Text";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { Stack } from "@/shared/ui/Stack";
import { data, emailRegex } from '@/shared/lib/validateInput';
import { EnvelopeIcon } from "@/shared/assets/svg/envelopeIcon";
import { DecorationIcon } from "@/shared/assets/svg/heroIcons";
import { RunningLine } from "@/entities/RunningLine/index";
import { dataPromo } from "@/entities/RunningLine/lib/data";
import styles from './Subscription.module.scss'

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
            direction="column"
            justify='center'
            align='center'
            className={styles.main}
        >
            <RunningLine data={dataPromo}/>
            <Stack 
                className={styles.subscriptionContainer} 
                align="center" 
                justify="center"
                direction="column"
            >
                <DecorationIcon />
                <DecorationIcon />
                <Stack className={styles.subscription} 
                    direction="column" 
                    align="center" 
                    justify="center"
                    gap='48'
                >
                    <Stack 
                        direction="column" 
                        align="center" 
                        justify="center" 
                        gap='24'
                    >
                        <TitleSection title="Будь всегда в теме" subtitle="НОВОСТИ"/>
                        <Text font='geometria400'
                        color="blue" size="24"
                        >Получите скидку <strong>3%</strong> на первый заказ, 
                        <br /> просто подписавшись на наши новости</Text>
                    </Stack>
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)}
                                className={styles.form}>
                            <EnvelopeIcon/>
                            <Input 
                                name="email"
                                register={register("email", {
                                    required: data.required,
                                    pattern: {
                                        value: emailRegex,
                                        message: data.errors.validEmail,
                                    }
                                })}
                                className={styles.input}
                                placeholder="Введите свою почту"
                                error={errors?.email}
                            />
                            <Button cta type="submit"
                                className={styles.button}>
                                Подписаться
                            </Button>
                        </form>
                    </FormProvider>
                </Stack>
            </Stack>
        </Stack>

    )
}