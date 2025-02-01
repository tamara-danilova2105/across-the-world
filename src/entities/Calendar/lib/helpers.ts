export function getMonthData(date: Date): Date[][] {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    // const lastDay = new Date(year, month + 1, 0);

    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - ((firstDay.getDay() + 6) % 7));

    const weeks: Date[][] = [];
    let currentWeek: Date[] = [];

    for (let i = 0; i < 42; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);

        if (i % 7 === 0 && i !== 0) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
    
        currentWeek.push(currentDate);
    }
    weeks.push(currentWeek);

    return weeks;
}

export function addMonths(date: Date, months: number): Date {
    const result = new Date(date);
    const targetMonth = result.getMonth() + months;
    result.setMonth(targetMonth); 

    if (result.getMonth() !== (targetMonth % 12 + 12) % 12) {
        result.setDate(0);
    }

    return result;
}

export function isSameDay(date1: Date, date2: Date): boolean {
    return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
    );
}

export function isDateInRange(date: Date, start: Date, end: Date): boolean {
    return date >= start && date <= end;
}