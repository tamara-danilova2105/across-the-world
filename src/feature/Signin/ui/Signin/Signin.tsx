import { useForm, FormProvider } from 'react-hook-form';
import { Stack } from "@/shared/ui/Stack/Stack"
import { SigninForm } from "../SigninForm/SigninForm"
import { AppLink } from '@/shared/ui/AppLink';
import { getRouteAdmin, getRouteForgotPassword } from '@/app/router/lib/helper';
import { DecorationIcon } from '@/shared/assets/svg/heroIcons';
import { LogoMain } from '@/shared/assets/svg/logo_main';
import { LogoFont } from '@/shared/assets/svg/logoFont';
import { useAuth } from '@/shared/hooks/useAuth';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import styles from './Signin.module.scss'

export const Signin = () => {

    const { isAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) navigate(getRouteAdmin());
    }, [])

    const methods = useForm()

    return(
        <FormProvider {...methods}>
            <main>
                <DecorationIcon/>
                <DecorationIcon />
                <Stack 
                    gap='16' align="center" 
                    className={styles.logo_container}
                >
                    <LogoMain />
                    <LogoFont />
                </Stack>
            <Stack
                className={styles.signin_container}
                direction='column'
                align='center'
                gap='16'
            >
                <SigninForm/>
                <AppLink
                    to={getRouteForgotPassword()}
                >
                    Забыли пароль?
                </AppLink>
            </Stack>
            </main>
        </FormProvider>
    )
}