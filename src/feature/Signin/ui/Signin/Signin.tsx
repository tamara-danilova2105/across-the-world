import { useEffect } from "react";
import { useNavigate } from "react-router";
import { DecorationIcon } from "@/shared/assets/svg/heroIcons";
import { useAuth } from "@/shared/hooks/useAuth";
import { getRouteAdmin } from "@/app/router/lib/helper";
import { SigninForm } from "../SigninForm/SigninForm";
import styles from './Signin.module.scss';

export const Signin = () => {
    const { isAuth } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) navigate(getRouteAdmin());
    }, []);

    return (
        <main className={styles.main}>
            <DecorationIcon />
            <DecorationIcon />
            <SigninForm />
        </main>
    );
};