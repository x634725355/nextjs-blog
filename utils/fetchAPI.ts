const BASE_URL = 'http://localhost:2077/';

const CONTENT_TYPE_MAP = {
    json: 'application/json',
    form: 'application/x-www-form-urlencoded'
}

export class API {

    static parseQueryString(params = {}, mark = false) {
        return (mark ? '?' : '') + Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
        // 下面的方式是URLSearchParms方式
        // return (mark ? '?' : '') + new URLSearchParams(params).toString();
    }

    // 如果要发送凭证 或者要在Cookie里面放东西记得添加credentials属性
    static _request(url, params, urlParams, method = 'GET', type = 'json') {
        const args = urlParams ? API.parseQueryString(urlParams, true) : '';

        return fetch(BASE_URL + url + args, {
            method,
            body: params,
            headers: {
                ...CONTENT_TYPE_MAP[type] ? ({
                    'Content-Type': CONTENT_TYPE_MAP[type]
                }) : {}
            }
        })
    }

    static async get(url, urlParams?) {
        return (await API._request(url, undefined, urlParams, undefined, null)).json();
    }

    static async post(url, params, urlParams?) {
        return (await API._request(url, JSON.stringify(params), urlParams, 'POST')).json();
    }

    static async postForm(url, params, urlParams?) {
        return (await API._request(url, JSON.stringify(params), urlParams, 'POST', 'form')).json();
    }

    static async delete(url, params, urlParams?) {
        return (await API._request(url, JSON.stringify(params), urlParams, 'DELETE')).json();
    }

    static async put(url, params, urlParams?) {
        return (await API._request(url, JSON.stringify(params), urlParams, 'PUT')).json();
    }
}