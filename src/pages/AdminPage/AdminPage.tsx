import { FAQEditor } from "@/feature/FAQEditor";
import { FullRegionEditor } from "@/feature/FullRegionEditor";
import styles from './AdminPage.module.scss';

const AdminPage = () => {
    return (
        <main className={styles.main}>
            <FullRegionEditor />
            <FAQEditor />
        </main>
    );
};

export default AdminPage;