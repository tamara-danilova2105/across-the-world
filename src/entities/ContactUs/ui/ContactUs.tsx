import { Stack } from "@/shared/ui/Stack";
import { dataContacts } from "../lib/data";
import styles from './ContactUs.module.scss';
import React from "react";

export const ContactUs = () => {
    return (
        <Stack gap="32" className={styles.contact_us}>
            {dataContacts.map((contact, index) => 
                <React.Fragment key={index}>
                    <span className='visually-hidden'>открыть телеграм</span>
                    <a
                        className={styles.link}
                        href={contact.href}
                        target='_blank'
                        rel="noreferrer"
                    >
                        {contact.icon}
                    </a>
                </React.Fragment>
            )}
        </Stack>
    );
};
