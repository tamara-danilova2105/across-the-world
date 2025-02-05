import { Stack } from "@/shared/ui/Stack";
import { SideBar } from "@/widgets/SideBar";
import { AppRouter } from "./router/ui/AppRouter";

export const AdminLayout = () => {
    return (
        <Stack>
            <SideBar />
            <Stack
                tag="main"
                align='center'
                max
                className='admin_layout'
            >
                <AppRouter />
            </Stack>
        </Stack>
    );
};