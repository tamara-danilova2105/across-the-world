import { TourCardAdmin } from './ui/TourCardAdmin/TourCardAdmin';
import { TourCard } from './ui/TourCard/TourCard';
import { TourScroll } from './ui/TourScroll/TourScroll';
import { TourSelect } from './ui/TourSelect/TourSelect';
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
    Region,
    DayProgram,
    MapMarker,
} from './model/types/types'

export {
    TourCardAdmin,
    TourCard,
    TourScroll,
    TourSelect,

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
    Region,
    DayProgram,
    MapMarker,
};