export { auth as middleware } from "@/config/authConfig";

export const config = {
    matcher: ["/shop/:path*"], // Protege las rutas dentro de /dashboard
};