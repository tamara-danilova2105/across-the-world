import { api } from "@/shared/api/api";
import { endpoints } from "@/shared/api/endpoints";
import { createApiConfig } from "@/shared/api/helper";


interface MailTag {
    type: 'Mail';
    id: string; 
}

const MAIL_TAG: MailTag[] = [{ type: 'Mail', id: 'Mails'}];

const urlTimer = endpoints.path.mail;

const subscribeApi = api.injectEndpoints({
    endpoints:(build) => ({
        subscribe: build.mutation({
            query: (body) => createApiConfig(
                'POST',
                `${urlTimer}`,
                false,
                body
            ),
            invalidatesTags: MAIL_TAG,
        })
    })
})

export const { useSubscribeMutation } = subscribeApi;

