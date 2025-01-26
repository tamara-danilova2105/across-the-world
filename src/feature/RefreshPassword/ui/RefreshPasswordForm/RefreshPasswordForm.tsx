import { useState } from "react";
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useFormContext } from "react-hook-form"
import { useNavigate, useParams } from "react-router"
import { data, validatePassword } from "@/shared/lib/validateInput";
import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import { Stack } from "@/shared/ui/Stack/Stack";
import { EyeOff, Eye } from 'lucide-react';
import { FormData, useRefreshPasswordMutation } from "@/feature/AuthAdmin/api/signinApi";
import { getRouteSignin } from "@/app/router/lib/helper";
import { Text } from "@/shared/ui/Text/Text";
import styles from './RefreshPasswordForm.module.scss'

export const RefreshPasswordForm = () => {

    const { register, handleSubmit, formState: { errors } } = useFormContext()
    const [showPassword, setShowPassword] = useState(false)
    const passwordIcon = showPassword ? <EyeOff /> : <Eye />

    const [refreshPassword, {error, isLoading}] = useRefreshPasswordMutation()

    const { resetToken } = useParams()
    const navigate = useNavigate()

    const onSubmit = async (formData: FormData) => {
        const { newPassword } = formData

        if (!newPassword) {
            throw new Error('New password is required');
        }
        try {
            await refreshPassword({ resetToken, newPassword })
            navigate(getRouteSignin())
        } catch (e) {
            console.error('Ошибка смены пароля:', e)
        }
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            {error && <Text className={styles.error}>
                {error.data.message}
            </Text>}

            <Stack className={styles.password}>
                <Input 
                    label="Новый пароль"
                    type={!showPassword ? 'password' : 'text'}
                    placeholder="Введите новый пароль"
                    name="newPassword"
                    register={register("newPassword", {
                        required: data.required,
                        validate: validatePassword,
                    })}
                    error={errors?.newPassword}
                />
                <button 
                    type='button'
                    className={styles.password_btn}
                    onClick={() => setShowPassword(!showPassword)}>
                    {passwordIcon}
                </button>
            </Stack>
            <Button loading={isLoading} variant='white'>
                Обновить пароль
            </Button>
        </form>
    )
}