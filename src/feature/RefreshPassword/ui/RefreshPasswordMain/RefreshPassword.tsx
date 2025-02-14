import { DecorationIcon } from "@/shared/assets/svg/heroIcons";
import { LogoFont } from "@/shared/assets/svg/logoFont";
import { LogoMain } from "@/shared/assets/svg/logo_main";
import { Stack } from "@/shared/ui/Stack/Stack";
import { Text } from "@/shared/ui/Text/Text";
import { FormProvider, useForm } from "react-hook-form"
import { RefreshPasswordForm } from "../RefreshPasswordForm/RefreshPasswordForm";
import styles from './RefreshPassword.module.scss'


export const RefreshPassword = () => {

    const methods = useForm();

    return(
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
                <Stack className={styles.refresh_container}
                    direction='column'
                    align='center'
                    gap='16'
                >
                    <Text
                        type="h2"
                        font='geometria500'
                        color='blue'
                        size="24"
                    >
                        Обновление пароля
                    </Text>
                    <RefreshPasswordForm/>
                </Stack>
            </main>
        </FormProvider>
    )
}