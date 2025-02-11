import type { NewsBlogData } from './model/types/types';
import { NewsScroll } from './ui/NewsScroll/NewsScroll';
import { NewsCardAdmin } from './ui/NewsCardAdmin/NewsCardAdmin';
import { NewList } from './ui/NewList/NewList';
import { useGetAllNewsQuery } from './api/api';

export {
    NewsBlogData,
    NewsScroll,
    NewsCardAdmin,
    NewList,
    useGetAllNewsQuery
}