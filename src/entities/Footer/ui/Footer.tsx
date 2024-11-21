import { Stack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { ContactUs } from '@/entities/ContactUs';
import styles from './Footer.module.scss';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Stack 
                className={styles.footer_container} 
                justify='between'
            >
                <Stack direction='column' gap='16' align='start'>
                    <Text color='white' size='32' font='unbounded'>
                        КОНТАКТЫ
                    </Text>
                    <Text color='white' size='18'>
                        acrosstheworld@gmail.com
                    </Text>
                    <Text color='white' size='18'>
                        8-918-777-79-79
                    </Text>
                    <Text color='white' className={styles.text_dop}>
                        Сайт не является публичной офертой, <br /> определяемой положениями Статьи 437(2) Гражданского кодекса РФ.
                    </Text>
                </Stack>

                <Stack direction='column' gap='16' align='end'>
                    <ContactUs />
                    <Text color='white' size='18'>
                        ©2024 Кругосветка. Все права защищены
                    </Text>
                    <Text color='white' size='18'>
                        Сайт разработан в AL TECH LABS LTD.
                    </Text>

                    <Text color='white' className={styles.text}>
                        Meta Platforms Inc. (Instagram) - признана экстремистской, <br /> ее деятельность запрещена на территории России.
                    </Text>
                </Stack>

                {/* TODO - не дублировать */}
                <Stack direction='column' gap='8' className={styles.additional}>
                    <Text color='white'>
                        Сайт не является публичной офертой, определяемой положениями Статьи 437(2) Гражданского кодекса РФ.
                    </Text>

                    <Text color='white'>
                        Meta Platforms Inc. (Instagram) - признана экстремистской, ее деятельность запрещена на территории России.
                    </Text>
                </Stack>
            </Stack>
        </footer>
    );
};