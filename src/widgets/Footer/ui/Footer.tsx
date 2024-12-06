import { Link } from 'react-router-dom';
import { getRoutePrivacyPolicy } from '@/app/router/lib/helper';
import { Stack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { ContactUs } from '@/entities/ContactUs';
import { ObfuscatedEmail } from './ObfuscatedEmail/ObfuscatedEmail';
import { ObfuscatedPhone } from './ObfuscatedPhone/ObfuscatedPhone';
import styles from './Footer.module.scss';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Stack 
                className={styles.footer_container} 
                justify='between'
            >
                <Stack 
                    direction='column' 
                    gap='16' align='start'
                >
                    <Text type='h3' color='white' size='24' font='unbounded'>
                        О КОМПАНИИ
                    </Text>
                    <Text color='white' size='18'>
                        ИП Скидан Олеся Михайловна
                    </Text>
                    <Text color='white' size='18'>
                        ИНН: 262607484014
                    </Text>
                    <Text color='white' size='18'>
                        ОГРНИП: 323265100085894
                    </Text>
                    <Text color='white' size='18'>
                        ©2024 Кругосветка. Все права защищены
                    </Text>
                </Stack>

                <Stack 
                    direction='column' 
                    gap='16' align='end'
                >
                    <Text type='h3' color='white' size='24' font='unbounded'>
                        КОНТАКТЫ
                    </Text>
                    <ObfuscatedEmail />
                    <ObfuscatedPhone />
                    <ContactUs />
                    <Link 
                        to={getRoutePrivacyPolicy()}
                        style={{ 
                            textDecoration: "underline",
                            textDecorationThickness: "1px",
                            textUnderlineOffset: "5px",
                        }}
                    >
                        Политика конфидициальности
                    </Link>
                </Stack>
            </Stack>
            <Stack 
                justify='between'
                className={styles.additional}
            >
                <Text color='white'>
                    Сайт не является публичной офертой, <br /> определяемой положениями Статьи 437(2) Гражданского кодекса РФ.
                </Text>

                <Text color='white'>
                    Meta Platforms Inc. признана экстремистской, <br /> ее деятельность запрещена на территории РФ.
                </Text>
            </Stack>
        </footer>
    );
};
