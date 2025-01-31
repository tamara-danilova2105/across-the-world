import { Input } from "@/shared/ui/Input"
import { Stack } from "@/shared/ui/Stack"
import { Text } from "@/shared/ui/Text"
import { TextArea } from "@/shared/ui/TextArea"
import { FormProvider, get, useForm } from "react-hook-form"
import { TimerImage } from "../TimerImage/TimerImage"
import { useState } from "react"
import { TimerData } from "../../types/types"
import { data } from "@/shared/lib/validateInput"


export const AddNewTimerMain = () => {

    const [timerData, setTimerData] = useState<TimerData>({
        _id: crypto.randomUUID(),
        title: '',
        description: '',
        timer: '',
        imagesArray: [],
        imagesDetails: [],
    })

    console.log(timerData);

    const methods = useForm({ mode: 'onSubmit'})
    const { register, handleSubmit, reset, formState: { errors }} = methods;

    const onSubmit = () => {
        reset()
    }
    return(
        <FormProvider {...methods}>
            <Stack>
                <Text type='h2' color='blue' 
                    font='geometria500' size="24"
                >
                    Добавить новый таймер
                </Text>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        name="title"
                        register={register("title", { 
                            required: data.required })}
                        placeholder='введите название'
                        error={get(errors, "title")}/>
                    <TextArea
                        name="description"
                        register={register("description", { 
                            required: data.required })}
                            placeholder='введите описание таймера и скидки'
                        error={get(errors, "description")}/>
                    <Input
                        name="timer"
                        register={register("timer", { 
                            required: data.required })}
                        error={get(errors, "timer")}/>
                    <TimerImage
                        images={timerData.imagesArray}
                        details={timerData.imagesDetails}
                        onChange={(imagesArray) => setTimerData({ ...timerData, imagesArray })}
                    />
                </form>
            </Stack>
        </FormProvider>
    )
}