import { Stack } from "@/shared/ui/Stack/Stack"
import { Text } from "@/shared/ui/Text/Text"
import styles from './Instruction.module.scss'
import { AppLink } from "@/shared/ui/AppLink"
import { getRouteSignin } from "@/app/router/lib/helper"

export const Instruction = () => {
    return(
        <Stack
            direction="column"
            align='center'
            gap='8'
            className={styles.instruction}
        >
            <Text 
                size="18"
                color='blue'
                font='geometria500'
            >
                Инструкция по смене пароля отправлена на почту!
            </Text>
            <AppLink
                to={getRouteSignin()}
            >
                Страница входа
            </AppLink>
        </Stack>
    )
}