import Marquee from "react-fast-marquee";
import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { LogoIcon } from "@/shared/assets/svg/logoIcon";
import { DataProps } from "../lib/data";
import styles from './RunningLine.module.scss';

export const RunningLine = ({data}: DataProps) => {
    return (
        <Stack 
            className={styles.runningLine} 
            tag='section'
            aria-label="Промоакции"
        >
            <Marquee gradient={false} pauseOnHover={true}>
                {Array(1).fill(data).flat().map((item, index) => (
                    <Stack 
                        key={`${item.label}-${index}`} 
                        gap="32"
                        align='center'
                        className={styles.runningText}
                        tag='article'
                    >
                        <LogoIcon />
                        <Text 
                            font='geometria500'
                            color="peach"
                            size="24"
                        >
                            {item.label}
                        </Text>
                    </Stack>
                ))}
            </Marquee>
        </Stack>
    );
};
