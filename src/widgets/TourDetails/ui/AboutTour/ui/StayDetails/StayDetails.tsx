import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { ImagesTourGrid } from "../../../ImagesTourGrid/ImagesTourGrid";
import { Images } from "@/shared/types/types";
import { comfortData } from "@/widgets/TourDetails/lib/activity";
import { useResize } from "@/shared/hooks/useResize";
import { ImageTourSwiper } from "../../../ImageTourSwiper/ImageTourSwiper";

interface StayDetailsProps {
    images: Images[];
    comfort: string;
};

export const StayDetails = ({ images, comfort }: StayDetailsProps) => {

    const comfortText = comfortData.find(com => com.comfort === comfort);

    const width = useResize();
    const isMobile = width <= 767;

    return (
        <Stack
            direction="column" 
            gap='24' max
            tag='section'
            id="stay-details"
        >
            <Text type='h3' size='24' font='geometria500'>
                Проживание
            </Text>
            
            <Text size="16">
                {comfortText?.descriptoin}
            </Text>

            {
                isMobile ? (
                    <ImageTourSwiper images={images} />
                ) : (
                    <ImagesTourGrid 
                        showImagesDesktop={2}
                        images={images} 
                        variant="accommodation" 
                    />
                ) 
            }
        </Stack>
    );
};