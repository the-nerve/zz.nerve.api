import Sentry from '@sentry/serverless';

export const initSentry = (environment, release) =>
    Sentry.AWSLambda.init({
        dsn:
            'https://349624ef8c8a4e80a25fb859b16a5390@o364566.ingest.sentry.io/5573978',
        tracesSampleRate: 1.0,
        environment,
        release,
    });

export const errorHandler = Sentry.AWSLambda.wrapHandler;
