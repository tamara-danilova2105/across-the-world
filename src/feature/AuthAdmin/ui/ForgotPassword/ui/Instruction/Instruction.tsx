import { ChangeStateProps } from "@/shared/types/types"
import { Button } from "@/shared/ui/Button/Button"
import { Stack } from "@/shared/ui/Stack/Stack"
import { Text } from "@/shared/ui/Text/Text"
import styles from './Instruction.module.scss'

export const Instruction = ({ handleChangeState } : ChangeStateProps) => {
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
            <Button
                onClick={handleChangeState}
            >
                Страница входа
            </Button>
        </Stack>
    )
}