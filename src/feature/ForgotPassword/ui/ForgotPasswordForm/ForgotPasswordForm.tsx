import { useFormContext } from "react-hook-form";
import { Stack } from "@/shared/ui/Stack/Stack"
import { data, emailRegex } from "@/shared/lib/validateInput"
import { Button } from "@/shared/ui/Button/Button"
import { Input } from "@/shared/ui/Input/Input"
import { useResetPasswordMutation } from "@/entities/Auth/api/signinApi";
import { Text } from "@/shared/ui/Text/Text";
import { AppLink } from "@/shared/ui/AppLink";
import { getRouteSignin } from "@/app/router/lib/helper";
import styles from './ForgotPasswordForm.module.scss'

interface FormInputs {
    email: string;
}

interface StateProps {
    showExplain: () => void;
}

export const ForgotPasswordForm = ({ showExplain }: StateProps) => {

    const { register, handleSubmit, formState: { errors } } = useFormContext<FormInputs>()
    const [reset_password, { error, isLoading }] = useResetPasswordMutation()

    const onSubmit = async (formData: FormInputs) => {
        const { email } = formData

        if (!email) {
            throw new Error("Неверный email");
        }
        try {
            await reset_password({ email }).unwrap()
            if (showExplain) {
                showExplain()
            }
        } catch (e) {
            console.error('Ошибка сброса пароля:', e)
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.forgotPassword}
        >
            {error && "data" in error && (
                <Text className={styles.error}>
                    {(error.data as { message?: string })?.message || "Произошла ошибка"}
                </Text>
            )}
            <Input
                label='Почта'
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
            <Stack
                direction="column"
                gap='16'
                max
            >
                <AppLink
                    variant='just_button'
                    to={getRouteSignin()}
                >
                    Отмена
                </AppLink>

                <Button
                    type='submit'
                    loading={isLoading}
                >
                    Сбросить пароль
                </Button>
            </Stack>
        </form>
    )
}