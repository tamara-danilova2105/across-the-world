import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { EmailIcon, PhoneIcon } from "@/shared/assets/svg/contactIcons";
import { InstagramIcon, TelegrmaIcon } from "@/shared/assets/svg/sotialMediaIcons";
import styles from './Header.module.scss';

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

                <Text size='16' color='white'>
                    Ваши приключения начинается здесь
                </Text> 

                <Stack gap="32">
                    <TelegrmaIcon />
                    <InstagramIcon />
                </Stack>
            </Stack>
        </Stack>
    );
};
