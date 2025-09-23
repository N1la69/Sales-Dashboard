import { toast } from "react-toastify";
export const logOutUser = async () => {
    try {
        const res = await fetch("/api/user/logout", {
            method: "POST",
            credentials: "include",
        });
        if (res.ok) {
            console.log("User logged out successfully");
            toast.success("Logged out successfully");
            window.location.reload();
        } else {
            console.error("Logout failed");
            toast.error("Logout failed");
        }
    } catch (err) {
        console.error("An error occurred during logout:", err);
        toast.error("An error occurred during logout");
    }
};
