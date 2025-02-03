import { BreadCrumbs } from "@/entities/BreadCrumbs"
import { AboutGuide } from "./AboutGuide/AboutGuide"
import styles from './AboutUs.module.scss';
import { Statistic } from "./Statistic/Statistic";
import { StoryAboutUs } from "./StoryAboutUs/StoryAboutUs";

export const AboutUs = () => {

    return (
        <main className={styles.aboutUs}>
            <BreadCrumbs />
            <StoryAboutUs/>
            <Statistic/>
            <AboutGuide/>
        </main>
    )
}