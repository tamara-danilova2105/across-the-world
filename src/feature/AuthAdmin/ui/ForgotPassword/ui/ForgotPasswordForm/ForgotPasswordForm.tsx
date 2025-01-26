import { useFormContext } from "react-hook-form";
import { Stack } from "@/shared/ui/Stack/Stack"
import { data, emailRegex } from "@/shared/lib/validateInput"
import { Button } from "@/shared/ui/Button/Button"
import { Input } from "@/shared/ui/Input/Input"
import { FormData, useResetPasswordMutation } from "@/feature/AuthAdmin/api/signinApi";
import { Text } from "@/shared/ui/Text/Text";
import { ChangeStateProps } from "@/shared/types/types";
import styles from './ForgotPasswordForm.module.scss'


export const ForgotPasswordForm = ({ handleChangeState, showExplain } : ChangeStateProps ) => {

    const { register, handleSubmit, formState: { errors } } = useFormContext() 
    const [ reset_password, {error, isLoading}] = useResetPasswordMutation()

    console.log(error)

    const onSubmit = async (formData: FormData ) => {
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

    return(
        <form 
            onSubmit={handleSubmit(onSubmit)}
            className={styles.forgotPassword}
        >
            {error && <Text className={styles.error}>
                {error.data.message}
            </Text>}
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
                <Button
                type='button' onClick={handleChangeState}>
                    Отмена
                </Button>

                <Button 
                type='submit'
                    loading={isLoading} 
                    variant='white'
                >
                    Сбросить пароль
                </Button> 
            </Stack>
        </form>
    )
}