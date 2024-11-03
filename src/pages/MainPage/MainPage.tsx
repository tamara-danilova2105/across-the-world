import { Hero } from "@/entities/Hero";
import { Stack } from "@/shared/ui/Stack";
import { AboutUs } from "@/widgets/AboutUs/ui/AboutUs";
import { EarlyBook } from "@/widgets/EarlyBook/EarlyBook";
import { Subscription } from "@/widgets/Subscription/Subscription";

const MainPage = () => {
    return (
        <Stack tag='main' direction='column' gap='48'>
            <Hero />
            <EarlyBook/>
            <AboutUs/>
            <Subscription/>
        </Stack>
    );
};

export default MainPage;
