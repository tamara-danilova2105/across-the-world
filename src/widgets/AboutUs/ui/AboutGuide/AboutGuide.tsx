import { Stack } from "@/shared/ui/Stack";
import { useCallback } from "react";
import { Guides } from "../../lib/data";
import { TitleSection } from "@/entities/TitleSection";
import { useResize } from "@/shared/hooks/useResize";
import { useScrollSlider } from "@/shared/hooks/useScrollSlider";
import { CustomeSwiper } from "@/shared/ui/CustomeSwiper";
import { GuideCard } from "@/entities/GuideCard";
import { GuideData } from "@/entities/GuideCard/model/types";
import styles from "./AboutGuide.module.scss";

export const AboutGuide = () => {
    const width = useResize();
    const isSwiperActive = width <= 590;
    const { containerRef } = useScrollSlider(width);

    const renderGuide = useCallback((guide: GuideData) => <GuideCard key={guide._id} guide={guide} />, []);

    return (
        <Stack 
            direction="column" 
            className={styles.aboutGuideContainer}
            gap="32"
            max
        >
            <TitleSection subtitle="Наша команда" title="Гид — ключ от мира" />
            {isSwiperActive ? (
                <div style={{ width: "100%", padding: "0 10px" }}>
                    <CustomeSwiper items={Guides} renderItem={renderGuide} />
                </div>
            ) : (
            <Stack 
                className={styles.aboutGuide} 
                gap="24" 
                align="center"
                ref={containerRef}
            >
                {Guides.map((guide: GuideData) => (
                    <GuideCard key={guide._id} guide={guide} />
                ))}
            </Stack>
            )}
        </Stack>
    );
};
