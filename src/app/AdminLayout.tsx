import { Stack } from "@/shared/ui/Stack";
import { SideBar } from "@/widgets/SideBar";
import { AppRouter } from "./router/ui/AppRouter";
import { ToastContainer } from "react-toastify";

const toastDefaultSetting = {
    autoClose: 3000,
    hideProgressBar: true,
    pauseOnHover: false
}

export const AdminLayout = () => {
    return (
        <>
            <ToastContainer {...toastDefaultSetting} />
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
        </>
    );
};