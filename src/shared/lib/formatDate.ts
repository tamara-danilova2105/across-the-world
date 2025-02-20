export const formatToRussianDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU");
}

export const formatNumber = (value?: number) => {
    if (!value) return "";
    return new Intl.NumberFormat("ru-RU").format(value);
};