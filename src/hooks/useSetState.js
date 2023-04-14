import { useGetAxios } from "./useAxios"

export const useSetState = (url, methodToState) => {
    useGetAxios(url)
        .then((res) => {
            methodToState(res.data);
        });
}