import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { ImagesTourGrid } from "../../../ImagesTourGrid/ImagesTourGrid";
import { Images } from "@/shared/types/types";
import { comfortData } from "@/widgets/TourDetails/lib/activity";

interface StayDetailsProps {
    images: Images[];
    comfort: string;
};

export const StayDetails = ({ images, comfort }: StayDetailsProps) => {

    const comfortText = comfortData.find(com => com.comfort === comfort);

    return (
        <Stack
            direction="column" 
            gap='24' max
        >
            <Text size='24' font='geometria500'>
                Проживание
            </Text>
            
            <Text size="16">
                {comfortText?.descriptoin}
            </Text>

            <ImagesTourGrid 
                showImagesDesktop={2} 
                showImagesTablet={1} 
                images={images} variant="accommodation" 
            />
        </Stack>
    );
};