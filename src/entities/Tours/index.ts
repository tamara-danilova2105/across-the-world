import { TourCardAdmin } from './ui/TourCardAdmin/TourCardAdmin';
import { TourCard } from './ui/TourCard/TourCard';
import { useGetAllToursQuery } from './api/api';
import type { 
    Tour, 
    DateTours, 
    ActivityLevel, 
    ComfortType, 
    DirectionTour, 
    TypeTour, 
    Price,
    Regions,
} from './model/types/types'

export {
    TourCardAdmin,
    TourCard,
    useGetAllToursQuery,
    Tour,
    DateTours, 
    ActivityLevel, 
    ComfortType, 
    DirectionTour, 
    TypeTour,
    Price,
    Regions,
};