import { dataContacts } from "../lib/data";
import styles from './ContactUs.module.scss';

export const ContactUs = () => {
    return (
        <ul className={styles.contact_us}>
            {dataContacts.map(contact => 
                <li key={contact.label}>
                    <a
                        className={styles.link}
                        href={contact.href}
                        target='_blank'
                        rel="noreferrer"
                        aria-label={`Открыть ${contact.label}`}
                    >
                        {contact.icon}
                    </a>
                </li>
            )}
        </ul>
    );
};
