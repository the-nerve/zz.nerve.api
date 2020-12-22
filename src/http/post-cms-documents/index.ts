import { Request, Response } from '@architect/shared/global/types';
import { SanityCMSWebhook } from '@architect/shared/cms/types';

export async function handler(req: Request<SanityCMSWebhook>): Response {
    console.log('REQUEST OBJECT: ', req.body);
    return {
        body: JSON.stringify({ ok: true }),
    };
}
