import { useState } from "react";
import { useNavigate } from "react-router";
import { Stack } from "@/shared/ui/Stack/Stack";
import { useFormContext } from 'react-hook-form';
import { data } from "@/shared/lib/validateInput";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button/Button";
import { EyeOff, Eye } from 'lucide-react';
import { useSigninMutation } from "@/entities/Auth/api/signinApi";
import { getRouteAdmin } from "@/app/router/lib/helper";
import Cookies from "js-cookie";
import { Text } from "@/shared/ui/Text/Text";
import styles from './SigninForm.module.scss';

interface FormInputs {
    login: string;
    password: string;
}

export const SigninForm = () => {

    const [showPassword, setShowPassword] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useFormContext<FormInputs>()
    const passwordIcon = showPassword ? <EyeOff /> : <Eye />

    const [signin, { error, isLoading }] = useSigninMutation();
    const navigate = useNavigate()

    const onSubmit = async (formData: FormInputs) => {
        const { login, password } = formData
        try {
            const response = await signin({ login, password }).unwrap();
            if (response?.token) {
                Cookies.set('authToken', response.token.accessToken, { secure: true })
                Cookies.set('refreshToken', response.token.refreshToken, { secure: true })
            }
            reset()
            navigate(getRouteAdmin())
        } catch (err) {
            console.error('Ошибка входа:', err)
        }
    }

    return (
        <form
            className={styles.signin_form}
            onSubmit={handleSubmit(onSubmit)}
        >
            {error && "data" in error && (
                <Text className={styles.error}>
                    {(error.data as { message?: string })?.message || "Произошла ошибка"}
                </Text>
            )}
            <Input
                label="Логин"
                placeholder='введите логин'
                name="login"
                register={register('login', {
                    required: data.required,
                })}
                error={errors.login}
            />
            <Stack className={styles.password}>
                <Input
                    label="Пароль"
                    type={!showPassword ? 'password' : 'text'}
                    placeholder="Введите пароль"
                    name="password"
                    register={register("password", {
                        required: data.required
                    })}
                    error={errors.password}
                />
                <button
                    type='button'
                    className={styles.password_btn}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={!showPassword ? "Показать пароль" : "Скрыть пароль"}>
                    {passwordIcon}
                </button>
            </Stack>
            <Button loading={isLoading}>
                Войти
            </Button>
        </form>
    )
}