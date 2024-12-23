import { Calendar } from "@/entities/Calendar";
import { TourForm } from "@/feature/AddNewTour";
import { AdminMap } from "@/feature/Mapbox";
import { NewsEditor } from "@/feature/NewsEditor";

const AdminPage = () => {
    return (
        <main>
            <AdminMap />
            <Calendar />
            <NewsEditor />
            <TourForm />
        </main>
    );
};

export default AdminPage;