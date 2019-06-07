/* eslint-disable */

const addNamespaces = (Vue, namespaces, value) => {
    if (namespaces.length === 1) {
        Vue[namespaces[0]] = value;
        Vue.prototype[namespaces[0]] = value;

    } else {
        const namespace = namespaces.shift();
        const ret = addNamespaces((!(namespace in Vue) ? {} : Vue[namespace]), namespaces, value);
        Vue[namespace] = ret;
        Vue.prototype[namespace] = ret;
    }

    return Vue;
};

const Install = (namespaces, obj) => {
    if (!Array.isArray(namespaces)) {
        namespaces = namespaces.split('.');
    }

    const first = namespaces[0];
    return {
        install(Vue) {
            let tmp = addNamespaces(Vue, namespaces, obj);

            Vue[first] = tmp[first];
            Vue.prototype[first] = tmp[first];
        }
    }
};

export default Install;
