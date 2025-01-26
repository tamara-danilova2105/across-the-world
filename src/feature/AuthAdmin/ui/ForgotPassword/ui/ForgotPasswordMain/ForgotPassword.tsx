import { useCallback, useState } from "react";
import { useForm, FormProvider } from 'react-hook-form';
import { Stack } from "@/shared/ui/Stack/Stack";
import { Instruction } from "../Instruction/Instruction";
import { ForgotPasswordForm } from "../ForgotPasswordForm/ForgotPasswordForm";
import { Text } from "@/shared/ui/Text/Text";
import { ChangeStateProps } from "@/shared/types/types";
import styles from './ForgotPassword.module.scss'

export const ForgotPassword = ({ handleChangeState } : ChangeStateProps) => {

    const methods = useForm()
    const [ isExplain, setIsExplain ] = useState(false)

    const showExplain = useCallback(() => {
        setIsExplain(!isExplain)
    },[])

    return (
        <FormProvider {...methods}>
            <Stack 
                direction='column'
                align='center'
                justify='center'
                gap='8'
                className={styles.forgotPassword_container}
            >
                <Text
                    type="h2"
                    font='geometria500'
                    color='blue'
                    size="24"
                >
                    Сброс пароля
                </Text>

                {isExplain ? 
                <Instruction handleChangeState={ handleChangeState }/>
                :
                <ForgotPasswordForm 
                    showExplain={showExplain}
                    handleChangeState={ handleChangeState }/>}
            </Stack>
        </FormProvider>
    )
}