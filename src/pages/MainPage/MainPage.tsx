import { Navbar } from "@/entities/Navbar";
import { Timer } from "@/entities/Timer/index";
import { Stack } from "@/shared/ui/Stack";

const MainPage = () => {
    return (
        <Stack tag='main' direction='column' gap='48'>
            MAIN PAGE
            <Timer styleMode='timer_earlyBook' endTime='2024-12-31T20:59:59.000Z'/>
            <Navbar/>
        </Stack>
    );
};

export default MainPage;
