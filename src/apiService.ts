export interface APIParam {
    baseUrl: string;
    configuredHeaders?: any;
    body?: any;
    menthod?: any;
}

function doFetch(url: string, method: string, body: any, configuredHeaders = {}) {
    const options: any = {
        method,
        mode: 'cors'
    };
    if (body) {
        if (body instanceof FormData) {
            options.body = body;
        } else {
            options.body = JSON.stringify(body);
            options.headers = {
                Accept: 'application/json',
                'Content-type': 'application/json'
            };
        }
    }

    options.headers = options.headers || {};
    options.headers.authToken = localStorage.getItem('auth_token') || ``;
    options.headers = {
        ...options.headers,
        ...configuredHeaders
    };
    // options.headers.role_id = authInfo?.userInfo?.role_id ? authInfo.userInfo.role_id : ``;

    return fetch(url, options).then(async (resp) => {
        if (resp.status >= 400) {
            const body = await resp.json();
            console.log('Error inside fetch', body);
            if (body?.error?.key === 'INVALID_TOKEN' || body.key === 'UNAUTHORIZED') {
            }
            throw body;
        }
        return resp.json().then((response) => {
            if (response.error) {
                throw new Error(response.error);
            }
            return response;
        });
    });
}
export const getAPICall = (baseUrl: string, queryParams: any, configuredHeaders: any) => {
    return doFetch(baseUrl, 'GET', null, configuredHeaders);
};

export const postAPICall = ({ baseUrl, body, configuredHeaders }: APIParam) => {
    return doFetch(baseUrl, 'POST', body, configuredHeaders);
};

export const putAPICall = ({ baseUrl, body }: APIParam) => {
    return doFetch(baseUrl, 'PUT', body);
};

export const remove = ({ baseUrl, body }: APIParam) => {
    return doFetch(baseUrl, 'DELETE', body);
};
