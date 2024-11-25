export const formatDateRange = (dateStart: string, dateFinish: string) => {
    const months = [
        "янв.", "фев.", "мар.", "апр.", "мая", "июня",
        "июля", "авг.", "сент.", "окт.", "нояб.", "дек."
    ];

    const start = new Date(dateStart);
    const finish = new Date(dateFinish);

    const startDay = start.getDate();
    const startMonth = months[start.getMonth()];
    const startYear = start.getFullYear();

    const finishDay = finish.getDate();
    const finishMonth = months[finish.getMonth()];
    const finishYear = finish.getFullYear();

    if (startYear === finishYear) {
        if (startMonth === finishMonth) {
            return `${startDay} - ${finishDay} ${startMonth} ${startYear}`;
        } else {
        return `${startDay} ${startMonth} - ${finishDay} ${finishMonth} ${startYear}`;
        }
    }

    return `${startDay} ${startMonth} ${startYear} - ${finishDay} ${finishMonth} ${finishYear}`;
};
