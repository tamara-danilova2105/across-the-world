import { TourCardAdmin } from './ui/TourCardAdmin/TourCardAdmin';
import { TourCard } from './ui/TourCard/TourCard';
import { TourScroll } from './ui/TourScroll/TourScroll';
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
    MapMarker,
} from './model/types/types'

export {
    TourCardAdmin,
    TourCard,
    TourScroll,
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
    MapMarker,
};