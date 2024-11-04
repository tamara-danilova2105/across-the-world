import { Hero } from "@/widgets/Hero";
import { Stack } from "@/shared/ui/Stack";
import { EarlyBook } from "@/widgets/EarlyBook";
import { Subscription } from "@/widgets/Subscription";
import { Testimonials } from "@/widgets/Testimonials";
import { AboutUs } from "@/widgets/AboutUs";

const MainPage = () => {
    return (
        <Stack tag='main' direction='column' gap='48'>
            <Hero />
            <AboutUs />
            <EarlyBook/>
            <Testimonials />
            <Subscription/>
        </Stack>
    );
};

export default MainPage;
