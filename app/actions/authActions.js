export const loginSuccess = (userData) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: userData
    };
};
