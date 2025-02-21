import { api } from "@/shared/api/api";
import { endpoints } from "@/shared/api/endpoints";
import { createApiConfig } from "@/shared/api/helper";


interface MailTag {
    type: 'Mail';
    id: string; 
}

const MAIL_TAG: MailTag[] = [{ type: 'Mail', id: 'Mails'}];

const urlMail = endpoints.path.mail;

const subscribeApi = api.injectEndpoints({
    endpoints:(build) => ({
        getSubscribers: build.query({
            query: () => createApiConfig(
                'GET',
                `${urlMail}`,
            ),
            providesTags: () => MAIL_TAG,
        }),
        subscribe: build.mutation({
            query: (body) => createApiConfig(
                'POST',
                `${urlMail}`,
                false,
                body
            ),
            invalidatesTags: MAIL_TAG,
        }),
        manageSubscription: build.mutation({
            query: (body) => createApiConfig(
                'PUT',
                `${urlMail}`,
                true,
                body
            ),
            invalidatesTags: MAIL_TAG,
        })
    })
})

export const { 
    useGetSubscribersQuery,
    useLazyGetSubscribersQuery,
    useSubscribeMutation,
    useManageSubscriptionMutation} = subscribeApi;

