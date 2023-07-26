import jwt_decode from 'jwt-decode';

export const isAccessTokenCloseToExpiry = (accessToken) => {
    const decodedToken = jwt_decode(accessToken);
    const expirationTime = decodedToken.exp * 1000; //Convert to milli

    const currentTime = Date.now();
    const remainingTime = expirationTime - currentTime;
    const fiveMinutesInMilli = 5 * 60 * 1000;
    return remainingTime < fiveMinutesInMilli;
};
