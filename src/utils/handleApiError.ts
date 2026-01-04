import { AxiosError } from "axios";
import toast from "react-hot-toast";

export function handleApiError(error: unknown, defaultMessage: string = "Something went wrong") {
    if (error instanceof AxiosError) {
        console.error(error.response?.data || error.message);
        toast.error(error.response?.data?.error || defaultMessage);
    } else if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message);
    } else {
        console.error(error);
        toast.error(defaultMessage);
    }
};