import { Additional, getStyles } from "@/shared/lib/getStyles";
import { Stack } from "@/shared/ui/Stack";
import styles from './Timer.module.scss';
import React, { FC } from "react";
import { useCountdownTimer } from "../lib/useCountDownTimer";
import { Text } from "@/shared/ui/Text";

interface TimerProps {
    styleMode: 'timer_earlyBook' | 'timerCard';
    endTime: string;
}

export const Timer: FC<TimerProps> = ({ styleMode, endTime }) => {
    
    const { timeItems } = useCountdownTimer(endTime);

    const additional: Additional = [styles[styleMode]];
    const styleClass = getStyles(styles.timeContainer, {}, additional);

    const renderTimer = () => (
        timeItems.map((item, index) => (
            <React.Fragment key={index}>
                <Stack direction="column" align='center' justify='center'>
                    <Text color="blue"font="geometria600">{item.value}</Text>
                    <Text color="blue">{item.label}</Text>
                </Stack>
                {index < timeItems.length - 1 && <span>:</span>}
            </React.Fragment>
        ))
    );
    
    return (
        <Stack 
            className={styleClass} 
            align='center' 
            justify='center'
            role="timer" aria-live="polite"
        >
            {renderTimer()}
        </Stack>
    );
};
