import Marquee from "react-fast-marquee";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { LogoIcon } from "@/shared/assets/svg/logoIcon";
import styles from './RunningLine.module.scss';

interface RunningLineItem {
    icon: JSX.Element;
    text: string;
}

export const RunningLine = () => {
    
    const data: RunningLineItem[] = [
        {
            icon: <LogoIcon />,
            text: 'РАНЕЕ БРОНИРОВАНИЕ - 8%'
        },
        {
            icon: <LogoIcon />,
            text: 'ПОДПИСКА НА НОВОСТИ - 3%'
        },
        {
            icon: <LogoIcon />,
            text: 'ПОСТОЯННЫМ КЛИЕНТАМ - до 15%'
        },
    ];

    return (
        <Stack className={styles.runningLine}>
            <Marquee gradient={false} pauseOnHover={true}>
                {Array(1).fill(data).flat().map((item, index) => (
                    <Stack 
                        key={index} 
                        gap="16"
                        align='center'
                        className={styles.runningText}
                    >
                        {item.icon}
                        <Text font='geometria500' color="peach" size="24">
                            {item.text}
                        </Text>
                    </Stack>
                ))}
            </Marquee>
        </Stack>
    );
};
