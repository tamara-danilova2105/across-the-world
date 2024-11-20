import { useState, useEffect, useCallback } from 'react';

interface TimeLeft {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
}

interface CountdownTimerResult {
    timeItems: { value: number | undefined; label: string }[];
    isRunning: boolean;
}

const declOfNum = (number: number, titles: [string, string, string]): string => {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
        number % 100 > 4 && number % 100 < 20
            ? 2
            : cases[number % 10 < 5 ? number % 10 : 5]
    ];
};

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
            };
        }

        return localTimeLeft;
    }, [endTime]);

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
    const [isRunning, setIsRunning] = useState<boolean>(true);

    useEffect(() => {
        if (!isRunning) return;

        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft();
            setTimeLeft(newTimeLeft);

            if (Object.keys(newTimeLeft).length === 0) {
                clearInterval(timer);
                setIsRunning(false);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [calculateTimeLeft, isRunning]);

    const timeItems = [
        {
            value: timeLeft.days,
            label: timeLeft.days !== undefined
                ? declOfNum(timeLeft.days, ['День', 'Дня', 'Дней'])
                : '',
        },
        {
            value: timeLeft.hours,
            label: timeLeft.hours !== undefined
                ? declOfNum(timeLeft.hours, ['Час', 'Часа', 'Часов'])
                : '',
        },
        {
            value: timeLeft.minutes,
            label: timeLeft.minutes !== undefined
                ? declOfNum(timeLeft.minutes, ['Минута', 'Минуты', 'Минут'])
                : '',
        },
        {
            value: timeLeft.seconds,
            label: timeLeft.seconds !== undefined
                ? declOfNum(timeLeft.seconds, ['Секунда', 'Секунды', 'Секунд'])
                : '',
        },
    ];

    return { timeItems, isRunning }
};