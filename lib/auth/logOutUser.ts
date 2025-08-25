import { toast } from "react-toastify";
export const logOutUser = async () => {
    fetch("/api/user/logout", {
        method: "POST",
        credentials: "include",
    }).then((res) => {
        if (res.ok) {
            // Handle successful logout
            console.log("User logged out successfully");
            toast.success("Logged out successfully");
            window.location.href = "/login"; // Redirect to login page
        } else {
            // Handle logout error
            console.error("Logout failed");
            toast.error("Logout failed");
        }
    });
}