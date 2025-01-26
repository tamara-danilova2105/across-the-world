import { useForm, FormProvider } from 'react-hook-form';
import { Button } from "@/shared/ui/Button/Button"
import { Stack } from "@/shared/ui/Stack/Stack"
import { SigninForm } from "../SigninForm/SigninForm"
import { ChangeStateProps } from '@/shared/types/types';

export const Signin = ({ handleChangeState } : ChangeStateProps) => {

    const methods = useForm()

    return(
        <FormProvider {...methods}>
            <Stack
                direction='column'
                gap='8'
            >
                <SigninForm/>
                <Button
                    color="transparent"
                    onClick={handleChangeState}
                >
                    Забыли пароль?
                </Button>
            </Stack>
        </FormProvider>
    )
}