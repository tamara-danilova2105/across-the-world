import { FAQEditor } from "@/feature/FAQEditor";
import { FullRegionEditor } from "@/feature/FullRegionEditor";
import styles from './AdminPage.module.scss';
import { EditSubscription } from "@/feature/EditSubscription";

const AdminPage = () => {
    return (
        <main className={styles.main}>
            <FullRegionEditor />
            <FAQEditor />
            <EditSubscription />
        </main>
    );
};

export default AdminPage;