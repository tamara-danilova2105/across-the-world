import { TourCardAdmin } from './ui/TourCardAdmin/TourCardAdmin';
import { TourCard } from './ui/TourCard/TourCard';
import { 
    useGetAllToursQuery, 
    useAddTourMutation, 
    useUploadFilesMutation,
    useEditTourMutation,
} from './api/api';
import type { 
    Tour, 
    DateTours, 
    ActivityLevel, 
    ComfortType, 
    DirectionTour, 
    TypeTour, 
    Price,
    Regions,
    DayProgram,
} from './model/types/types'

export {
    TourCardAdmin,
    TourCard,
    useGetAllToursQuery,
    useAddTourMutation,
    useUploadFilesMutation,
    useEditTourMutation,
    Tour,
    DateTours, 
    ActivityLevel, 
    ComfortType, 
    DirectionTour, 
    TypeTour,
    Price,
    Regions,
    DayProgram,
};