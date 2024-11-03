import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import styles from './RunningLine.module.scss';
import logo from '@/shared/assets/png/logo_line.png'

export const RunningLine = () => {
    return (
        <Stack className={styles.runningLine}
        justify="center">
            <Stack className={styles.runningText}
            justify="center"
            align="center"
            max>
                <img src={logo} alt=""/>
                <Text font='unbounded' color="peach" size="24">РАНЕЕ БРОНИРОВАНИЕ - 8%</Text>
                <img src={logo} alt=""/>
                <Text font='unbounded' color="peach" size="24">ПОДПИСКА НА НОВОСТИ - 3%</Text>
                <img src={logo} alt=""/>
                <Text font='unbounded' color="peach" size="24">РАНЕЕ БРОНИРОВАНИЕ - 8%</Text>
                <img src={logo} alt=""/>
                <Text font='unbounded' color="peach" size="24">ПОДПИСКА НА НОВОСТИ - 3%</Text>
                <img src={logo} alt=""/>
                <Text font='unbounded' color="peach" size="24">РАНЕЕ БРОНИРОВАНИЕ - 8%</Text>
                <img src={logo} alt=""/>
                <Text font='unbounded' color="peach" size="24">ПОДПИСКА НА НОВОСТИ - 3%</Text>
                <img src={logo} alt=""/>
                <Text font='unbounded' color="peach" size="24">ПОДПИСКА НА НОВОСТИ - 3%</Text>
                <img src={logo} alt=""/>
                <Text font='unbounded' color="peach" size="24">РАНЕЕ БРОНИРОВАНИЕ - 8%</Text>
                <img src={logo} alt=""/>
                <Text font='unbounded' color="peach" size="24">ПОДПИСКА НА НОВОСТИ - 3%</Text>
                <img src={logo} alt=""/>
            </Stack>
        </Stack>
    );
};