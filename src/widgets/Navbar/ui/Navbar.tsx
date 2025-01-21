import { useLocation } from "react-router";
import { NavbarDesktop } from "./NavbarDesktop/NavbarDesktop";
import { NavbarMobile } from "./NavbarMobile/NavbarMobile";

export const Navbar = () => {
    const { pathname } = useLocation();
    if (pathname === "/admin") return null;

    return (
        <>
            <NavbarDesktop />
            <NavbarMobile />
        </>
    );
};