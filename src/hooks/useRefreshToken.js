import axios from "axios";
import { useStore } from "../store";
import { API_URL } from "../../config";

const useRefreshToken = () => {
    const setAuth = useStore(state => state.setAuth);

    const refresh = async () => {
        const response = await axios.get(`${API_URL}api/auth/refresh-token`, {
            withCredentials: true
        });
        localStorage.setItem("auth", JSON.stringify(response.data));
        const accessToken = response.data.accessToken;

        setAuth(accessToken);

        return accessToken;
    }
    return refresh;
}

export default useRefreshToken;