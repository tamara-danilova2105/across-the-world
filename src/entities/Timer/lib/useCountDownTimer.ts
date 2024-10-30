import { useState, useEffect, useCallback } from 'react';

interface TimeLeft {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
}

interface CountdownTimerResult {
    timeItems: { value: number | undefined; label: string }[];
    isRunning: boolean
}

export const useCountdownTimer = (endTime: string): CountdownTimerResult => {

    const calculateTimeLeft = useCallback((): TimeLeft => {
        const difference = new Date(endTime).getTime() - new Date().getTime()
        let localTimeLeft: TimeLeft = {}

        if (difference > 0) {
            localTimeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            }
        }

        return localTimeLeft;
    }, [endTime])

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft())
    const [isRunning, setIsRunning] = useState<boolean>(true)

    useEffect(() => {
        if (!isRunning) return;

        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft()
            setTimeLeft(newTimeLeft);

            if (Object.keys(newTimeLeft).length === 0) {
                clearInterval(timer);
                setIsRunning(false);
            }
        }, 1000)

        return () => clearInterval(timer)
    }, [calculateTimeLeft, isRunning])

    //{TODO - дописать функция для обработки склонений}
    const timeItems = [
        { value: timeLeft.days, label: 'Дней' },
        { value: timeLeft.hours, label: 'Часов' },
        { value: timeLeft.minutes, label: 'Минут' },
        { value: timeLeft.seconds, label: 'Сек' }
    ];

    return { timeItems, isRunning }
}

