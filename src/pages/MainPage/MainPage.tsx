import { Hero } from "@/widgets/Hero";
import { Stack } from "@/shared/ui/Stack";
import { EarlyBook } from "@/widgets/EarlyBook";
import { Subscription } from "@/widgets/Subscription";
import { Testimonials } from "@/widgets/Testimonials";
import { AboutUs } from "@/widgets/AboutUs";
import { FAQ } from "@/widgets/FAQ";
import { NewsBlog } from "@/widgets/NewsBlog";
import { OurTours } from "@/widgets/OurTours";

const MainPage = () => {
    return (
        <Stack tag='main' direction='column' gap='48'>
            <Hero />
            <AboutUs />
            <OurTours />
            <EarlyBook/>
            <Testimonials />
            <NewsBlog/>
            <FAQ />
            <Subscription/>
        </Stack>
    );
};

export default MainPage;
