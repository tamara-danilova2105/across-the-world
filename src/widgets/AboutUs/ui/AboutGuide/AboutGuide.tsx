import { Stack } from "@/shared/ui/Stack";
import { Founder, Guides } from "../../lib/data";
import { TitleSection } from "@/entities/TitleSection";
import { GuideCard } from "@/entities/GuideCard";
import { GuideData } from "@/entities/GuideCard/model/types";
import styles from "./AboutGuide.module.scss";
import { Text } from "@/shared/ui/Text";
import { TentTree } from "lucide-react";

export const AboutGuide = () => {

    return (
        <Stack 
            direction="column" 
            className={styles.aboutGuideContainer}
            gap="32"
            max
        >
            <TitleSection subtitle="Наша команда" title="Гид — ключ от мира" />
            <Stack className={styles.founder_container}>
                <Stack className={styles.founder}
                        gap="24" justify="between" max>
                    <Stack direction="column" gap="16"
                        className={styles.founder_about}>
                        <TentTree size={200} className={styles.svg}/>
                        <Text size='24' color="blue"
                            font="geometria500" type="h3"
                        >{Founder.header}</Text>
                        <Text size="16">{ Founder.about}</Text>
                        <Text size="16">{Founder.story}</Text>
                        <Text size="16">{Founder.total}</Text>
                    </Stack>
                        <img src={Founder.image} alt={Founder.header}
                        className={styles.image}/>
                </Stack>
            </Stack>
            <Stack 
                className={styles.aboutGuide} 
                gap="24" 
                align="center"
            >
                {Guides.map((guide: GuideData) => (
                    <GuideCard key={guide._id} guide={guide} />
                ))}
            </Stack>
        </Stack>
    );
};
