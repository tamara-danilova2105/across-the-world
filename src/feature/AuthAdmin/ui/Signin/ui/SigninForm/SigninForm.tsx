import { useState } from "react";
import { useNavigate } from "react-router";
import { Stack } from "@/shared/ui/Stack/Stack";
import { useFormContext } from 'react-hook-form';
import { data, textRegex, validatePassword } from "@/shared/lib/validateInput";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button/Button";
import { EyeOff, Eye } from 'lucide-react';
import { FormData, useSigninMutation } from "@/feature/AuthAdmin/api/signinApi";
import { getRouteAdmin } from "@/app/router/lib/helper";
import Cookies from "js-cookie";
import { Text } from "@/shared/ui/Text/Text";
import styles from './SigninForm.module.scss';

export const SigninForm = () => {

    const [showPassword, setShowPassword] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useFormContext()
    const passwordIcon = showPassword ? <EyeOff /> : <Eye />

    const [signin, {error, isLoading}] = useSigninMutation();
    const navigate = useNavigate()

    const onSubmit = async (formData: FormData) => {
        const { login , password } = formData
        try {
            const response = await signin({ login, password }).unwrap();
            if (response?.token) {
                Cookies.set(
                'authToken', response.token.accessToken, { secure: true },
                'refreshToken', response.token.refreshToken, { secure: true })
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
            {error && <Text className={styles.error}>
                {error?.data?.message}
            </Text>}
            <Input 
                label="Логин" 
                placeholder='введите логин' 
                name="login"
                register={register('login', {
                    required: data.required,
                    pattern: {
                        value: textRegex,
                        message: data.errors.validName
                    }
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
                        required: data.required,
                        validate: validatePassword,
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
            <Button 
                loading={isLoading} 
                variant='white'
            >
                Войти
            </Button>
        </form>
    )
}