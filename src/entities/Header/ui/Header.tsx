import { Stack } from "@/shared/ui/Stack";
import styles from './Header.module.scss';
import { EmailIcon, PhoneIcon } from "@/shared/assets/svg/contactIcons";
import { InstagramIcon, TelegrmaIcon } from "@/shared/assets/svg/sotialMediaIcons";

export const Header = () => {
    return (
        <Stack 
            tag="header" max
            className={styles.header}
        >
            <Stack 
                justify='between'
                align='center'
                className={styles.header_content}
            >
                <Stack gap="32">
                    <EmailIcon />
                    <PhoneIcon />
                </Stack>

                <Stack gap="32">
                    <TelegrmaIcon />
                    <InstagramIcon />
                </Stack>
            </Stack>
        </Stack>
    );
};
