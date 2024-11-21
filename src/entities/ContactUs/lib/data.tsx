import { PhoneIcon } from "@/shared/assets/svg/contactIcons";
import { InstagramIcon, TelegrmaIcon, VkIcon } from "@/shared/assets/svg/sotialMediaIcons";
import { ReactNode } from "react"

export interface DataContacts {
    icon: ReactNode;
    href: string;
}

export const dataContacts: DataContacts[] = [
    {
        icon: <TelegrmaIcon />,
        href: 'https://t.me/acrosstheworldru',
    },
    {
        icon: <InstagramIcon />,
        href: 'https://www.instagram.com/acrosstheworld.ru',
    },
    {
        icon: <PhoneIcon />,
        href: 'https://wa.me/79187777979',
    },
    {
        icon: <VkIcon />,
        href: 'https://vk.com/acrosstheworld_ru',
    }
];
