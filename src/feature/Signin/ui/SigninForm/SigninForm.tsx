import { LogoMain } from "@/shared/assets/svg/logo_main";
import { LogoFont } from "@/shared/assets/svg/logoFont";
import { Stack } from "@/shared/ui/Stack";
import { Input } from "@/shared/ui/Input";
import styles from './SigninForm.module.scss';
import { Button } from "@/shared/ui/Button/Button";

export const SigninForm = () => {
    return (
        <form className={styles.signin_form}>
            <Stack 
                gap='16' align="center" 
                className={styles.logo_container}
            >
                <LogoMain />
                <LogoFont />
            </Stack>

            <Input 
                label="Логин" 
                placeholder='введите логин' 
            />
            <Input 
                label="Пароль"
                placeholder='введите пароль' 
                type="password"
            />
            <Button>
                Войти
            </Button>
        </form>
    );
};