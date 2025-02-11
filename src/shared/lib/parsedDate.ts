interface DateRange {
    startDate?: string | null;
    endDate?: string | null;
}

export const parsedDate = (dates: DateRange, placeholder: string = 'Когда?'): string => {
    const { startDate, endDate } = dates;

    if (startDate && endDate) {
        return `${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`
    }

    if (startDate) {
        return new Date(startDate).toLocaleDateString()
    }

    return placeholder;
}