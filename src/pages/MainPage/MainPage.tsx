import { Hero } from "@/widgets/Hero";
import { Stack } from "@/shared/ui/Stack";
import { AboutUs } from "@/widgets/AboutUs/ui/AboutUs";
import { EarlyBook } from "@/widgets/EarlyBook/EarlyBook";
import { Subscription } from "@/widgets/Subscription/Subscription";
import { Testimonials } from "@/widgets/Testimonials";

const MainPage = () => {
    return (
        <Stack tag='main' direction='column' gap='48'>
            <Hero />
            <AboutUs/>
            <EarlyBook/>
            <Testimonials />
            <Subscription/>
        </Stack>
    );
};

export default MainPage;
