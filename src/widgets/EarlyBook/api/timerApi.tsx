import { api } from "@/shared/api/api";
import { endpoints } from "@/shared/api/endpoints";
import { createApiConfig } from "@/shared/api/helper";


interface TimerTag {
    type: 'Timer';
    id: string; 
}

const TIMER_TAG: TimerTag[] = [{ type: 'Timer', id: 'Timers'}];

const urlTimer = endpoints.path.timer;

const timerApi = api.injectEndpoints({
    endpoints:(build) => ({
        getTimer: build.query({
            query: () => createApiConfig(
                'GET',
                `${urlTimer}`,
            ),
            providesTags: () => TIMER_TAG,
        }),
        addTimer: build.mutation({
            query: (body) => createApiConfig(
                'POST',
                `${urlTimer}`,
                true,
                body
            ),
            invalidatesTags: TIMER_TAG,
        }),
        editTimer: build.mutation({
            query: ({id, updateTimer}) => createApiConfig(
                'PUT',
                `${urlTimer}/${id}`,
                true,
                updateTimer
            ),
            invalidatesTags: TIMER_TAG,
        }),
        deleteTimer: build.mutation({
            query: () => createApiConfig(
                'DELETE',
                `${urlTimer}`,
                true
            ),
            invalidatesTags: TIMER_TAG,
        })
    })
})

export const {
    useGetTimerQuery,
    useAddTimerMutation,
    useEditTimerMutation,
    useDeleteTimerMutation
} = timerApi;
