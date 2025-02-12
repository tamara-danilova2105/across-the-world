import { z } from "zod";

export const tourSchema = z.object({
    types: z.array(z.string()).nonempty("Не выбран тип тура"),
    tour: z.string().min(1, "Название тура обязательно"),
    dates: z.array(
        z.object({
            date_start: z.string().min(1, "Дата обязательна"),
            date_finish: z.string().min(1, "Дата обязательна"),
            price: z.object({
                amount: z.string().min(1, "Укажите цену"),
            }),
            spotsTotal: z.string().min(1, "Укажите количество мест"),
        })
    ).nonempty("Не указаны данные с датами тура"),
    locations: z.object({
        place_start: z.string().min(1, "Не указано место"),
        place_finish: z.string().min(1, "Не указано место"),
    }),
    details: z.object({
        included: z.string().min(1, "Не добавлены услуги"),
        notIncluded: z.string().min(1, "Не добавлены услуги"),
    }),
    imageCover: z.array(z.object({ src: z.string() })).nonempty("Добавьте изображение обложки тура"),
    regions: z.array(z.string()).nonempty("Не выбран регион"),
    program: z.array(z.object({
        title: z.string().min(1, "Название дня обязательно"),
        details: z.string().min(1, "Описание дня обязательно"),
        images: z.array(z.object({ src: z.string() })),
    })).nonempty("Добавьте хотя бы один день в программе"),
    description: z.string().min(1, "Добавьте описание тура"),
    hotels: z.array(z.object({ src: z.string() })).optional(),
    isPublished: z.boolean().default(true),
    discount: z.object({
        endDate: z.string().min(1, "Дата окончания скидки обязательна"),
        percentage: z.number()
            .min(1, "Скидка должна быть больше 0%")
            .max(100, "Скидка не может быть более 100%"),
    }).optional(),
});
