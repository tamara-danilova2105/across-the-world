import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { DecorationIcon } from "@/shared/assets/svg/heroIcons";
import { useAuth } from "@/shared/hooks/useAuth";
import { getRouteAdmin } from "@/app/router/lib/helper";
import { Stack } from "@/shared/ui/Stack/Stack";
import { LogoMain } from "@/shared/assets/svg/logo_main";
import { LogoFont } from "@/shared/assets/svg/logoFont";
import { Signin } from "../Signin/ui/Signin/Signin";
import { ForgotPassword } from "../ForgotPassword/ui/ForgotPasswordMain/ForgotPassword";
import styles from './AuthAdmin.module.scss';

export const AuthAdmin = () => {

    const { isAuth } = useAuth();
    const navigate = useNavigate();
    const [forgotPassword, setForgotPassword] = useState(false)

    useEffect(() => {
        if (isAuth) navigate(getRouteAdmin());
    }, [])

    const handleChangeState = useCallback(() => {
        setForgotPassword(!forgotPassword)
    }, [forgotPassword])

    return (
        <main>
            <DecorationIcon />
            <DecorationIcon />
            <Stack 
                gap='16' align="center" 
                className={styles.logo_container}
            >
                <LogoMain />
                <LogoFont />
            </Stack>
            {forgotPassword ? 
            <ForgotPassword handleChangeState={handleChangeState}/>
            :
            <Signin handleChangeState={handleChangeState}/>}
        </main>
    );
};