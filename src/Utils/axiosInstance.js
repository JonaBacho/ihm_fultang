import axios from "axios";


const AuthInterceptor = (axiosInstance) => {
    axiosInstance.interceptors.request.use(
        (req) => {
            const token = localStorage.getItem("token_key_fultang");

            if (token) {
                req.headers["Authorization"] = "Bearer " + token;
            }
            return req;
        },
        (err) => {
            return Promise.reject(err);
        }
    );
};


const ErrorInterceptor = (axiosInstance) => {

    axiosInstance.interceptors.response.use(
        res => {
            return res;
        },
        error => {
            console.group("Error");
            console.log(error);
            console.groupEnd();

            return error.response
        }
    )
}


const axiosInstance = axios.create({
    baseURL: import.meta.env.BACKEND_API_BASE_URL,
});
AuthInterceptor(axiosInstance);
ErrorInterceptor(axiosInstance);

export default axiosInstance;