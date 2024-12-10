import { Calendar } from "@/entities/Calendar";
import { AdminMap } from "@/feature/Mapbox";

const AdminPage = () => {
    return (
        <main>
            <AdminMap />
            <Calendar />
        </main>
    );
};

export default AdminPage;