import { FAQEditor } from "@/feature/FAQEditor";
import styles from './AdminPage.module.scss';

const AdminPage = () => {
    return (
        <main className={styles.main}>
            <FAQEditor />
        </main>
    );
};

export default AdminPage;