export const getAccessToken = (authorization: string = '') => {
    return authorization.startsWith('Bearer ') ? authorization.split(' ')[1] : '';
};
