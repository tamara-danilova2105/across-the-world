import { Parallax } from "@/entities/Parallax/index";
import React from "react";

interface PageWithParallaxProps {
    children: React.ReactNode;
}

export const PageWithParallax = ({ children }: PageWithParallaxProps) => {
    return (
        <>
            <Parallax/>
            {children}
        </>
    );
};