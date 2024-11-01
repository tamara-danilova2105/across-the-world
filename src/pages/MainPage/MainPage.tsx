import { Hero } from "@/entities/Hero";
import { Timer } from "@/entities/Timer";
import { Stack } from "@/shared/ui/Stack";

const MainPage = () => {
    return (
        <Stack tag='main' direction='column' gap='48'>
            <Hero />
            <Timer styleMode='timer_earlyBook' endTime='2024-12-31T20:59:59.000Z'/>
        </Stack>
    );
};

export default MainPage;
