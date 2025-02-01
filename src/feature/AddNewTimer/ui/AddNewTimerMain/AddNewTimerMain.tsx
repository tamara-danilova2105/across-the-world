// import { useState } from "react"
// import { FormProvider, useForm, get } from "react-hook-form"
// import { Input } from "@/shared/ui/Input"
// import { TextArea } from "@/shared/ui/TextArea"
// import { TimerImage } from "../TimerImage/TimerImage"
// import { Stack } from "@/shared/ui/Stack"
// import { Text } from "@/shared/ui/Text"
// import { Details, TimerData } from "../../types/types"
// import { data } from "@/shared/lib/validateInput"
// import styles from './AddNewTimerMain.module.scss'
// import { Image } from "@/shared/types/types"

// export const AddNewTimerMain = () => {
//     const [timerData, setTimerData] = useState<TimerData>({
//         _id: crypto.randomUUID(),
//         title: '',
//         description: '',
//         timer: '',
//         imagesWithDetails: [],
//     })

//     console.log(timerData)

//     const methods = useForm({ mode: 'onSubmit' })
//     const { register, handleSubmit, reset, formState: { errors } } = methods;

//     const handleImagesChange = (newImagesWithDetails: { image: Image[], details: Details[] }[]) => {
//         const updatedTimerData = { ...timerData, imagesWithDetails: newImagesWithDetails };
//         setTimerData(updatedTimerData);
//     };

//     const onSubmit = () => {
//         console.log('Submitting:', timerData);
//         reset();
//         setTimerData({
//             _id: crypto.randomUUID(),
//             title: '',
//             description: '',
//             timer: '',
//             imagesWithDetails: [],
//         });
//     };

//     return (
//         <FormProvider {...methods}>
//             <Stack direction="column" className={styles.timerContainer} gap="24">
//                 <Text type='h2' color='blue' font='geometria500' size="32">
//                     Добавить новый таймер
//                 </Text>

//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <Input
//                         label='Название объявления'
//                         name="title"
//                         register={register("title", { required: data.required })}
//                         placeholder='Например: `Открываем набор групп на КАМЧАТКУ 2025`'
//                         error={get(errors, "title")}
//                     />
//                     <TextArea
//                         label='Описание акции'
//                         name="description"
//                         register={register("description", { required: data.required })}
//                         placeholder='Например: `При бронировании до 1 декабря действует скидка 8% по акции раннего бронирования.`'
//                         error={get(errors, "description")}
//                     />
//                     <Input
//                         label="Дата окончания таймера"
//                         name="timer"
//                         type="date"
//                         register={register("timer", { required: data.required })}
//                         error={get(errors, "timer")}
//                     />
//                     <TimerImage
//                         imagesWithDetails={timerData.imagesWithDetails}
//                         handleImagesChange={handleImagesChange}
//                         onChange={}
//                     />
//                     <button type="submit">Сохранить</button>
//                 </form>
//             </Stack>
//         </FormProvider>
//     )
// };