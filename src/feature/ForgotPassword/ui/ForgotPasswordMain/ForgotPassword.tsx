import { useCallback, useState } from "react";
import { useForm, FormProvider } from 'react-hook-form';
import { Stack } from "@/shared/ui/Stack/Stack";
import { Instruction } from "../Instruction/Instruction";
import { ForgotPasswordForm } from "../ForgotPasswordForm/ForgotPasswordForm";
import { Text } from "@/shared/ui/Text/Text";
import { DecorationIcon } from "@/shared/assets/svg/heroIcons";
import { LogoFont } from "@/shared/assets/svg/logoFont";
import { LogoMain } from "@/shared/assets/svg/logo_main";
import styles from './ForgotPassword.module.scss'

export const ForgotPassword = () => {

    const methods = useForm()
    const [ isExplain, setIsExplain ] = useState(false)

    const showExplain = useCallback(() => {
        setIsExplain(!isExplain)
    },[])

    return (
        <FormProvider {...methods}>
            <main>
                <DecorationIcon />
                <DecorationIcon />
                <Stack 
                    gap='16' align="center" 
                    className={styles.logo_container}
                >
                    <LogoMain />
                    <LogoFont />
                </Stack>
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
                    <Instruction/>
                    :
                    <ForgotPasswordForm 
                        showExplain={showExplain}/>}
                </Stack>
            </main>
        </FormProvider>
    )
}