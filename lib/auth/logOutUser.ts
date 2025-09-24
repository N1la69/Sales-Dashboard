import { toast } from "react-toastify";
export const logOutUser = async () => {
    try {
        const res = await fetch("/api/user/logout", {
            method: "POST",
            credentials: "include",
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message);
        toast.success(data.message || "Logged out successfully");
        await new Promise((resolve) => setTimeout(resolve, 1500));
        window.location.reload();
    } catch (error: any) {
        console.error("❌ Error in logout:", error);
        toast.error(error?.message || error);
    }
};
