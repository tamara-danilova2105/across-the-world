import { Calendar } from "@/entities/Calendar";
import { AdminMap } from "@/feature/Mapbox";
import { NewsEditor } from "@/feature/NewsEditor";

const AdminPage = () => {
    return (
        <main>
            <AdminMap />
            <Calendar />
            <NewsEditor />
        </main>
    );
};

export default AdminPage;