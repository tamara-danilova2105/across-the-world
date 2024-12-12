export const formatDateRange = (dateStart: string, dateFinish?: string, isMobile?: boolean) => {
    const months = [
        "янв.", "фев.", "мар.", "апр.", "мая", "июня",
        "июля", "авг.", "сент.", "окт.", "нояб.", "дек."
    ];

    const start = new Date(dateStart);

    const startDay = start.getDate();
    const startMonth = months[start.getMonth()];
    const startYear = start.getFullYear();

    if (!dateFinish) {
        return `${startDay} ${startMonth} ${startYear}`;
    }

    const finish = new Date(dateFinish);

    const finishDay = finish.getDate();
    const finishMonth = months[finish.getMonth()];
    const finishYear = finish.getFullYear();

    const separator = isMobile ? ' -\n' : ' - ';

    if (startYear === finishYear) {
        if (startMonth === finishMonth) {
            return `${startDay} - ${finishDay} ${startMonth} ${startYear}`;
        } else {
        return `${startDay} ${startMonth} - ${finishDay} ${finishMonth} ${startYear}`;
        }
    }

    return `${startDay} ${startMonth} ${startYear}${separator}${finishDay} ${finishMonth} ${finishYear}`;
};
