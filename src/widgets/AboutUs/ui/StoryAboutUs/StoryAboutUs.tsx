import { Shedule } from "@/entities/Shedule"
import { TitleSection } from "@/entities/TitleSection"
import { Button } from "@/shared/ui/Button"
import { Stack } from "@/shared/ui/Stack"
import { Text } from "@/shared/ui/Text"
import { useModal } from "@/shared/hooks/useModal"
import { PhotoAnimation } from "../PhotoAnimation/PhotoAnimation"
import styles from './StoryAboutUs.module.scss'
import { Country } from "../Country/Country"

export const StoryAboutUs = () => {

    const [changeModal, drawModal] = useModal();

    return(
        <Stack 
            justify="between"
            className={styles.storyContainer}
            gap="32"
            max
        >
            <Stack max>
                <PhotoAnimation/>
            </Stack>
            <Stack
                direction="column"
                gap="24"
                max
                className={styles.story}
            >
                <TitleSection subtitle="Наша компания" 
                    title="Открывай мир вместе с нами" />
                <Stack 
                    className={styles.story_container}
                    direction="column"
                    gap="16"
                >
                    <Text size="18">
                    Кругосветка — туристическая фирма,
                    организующая увлекательные туры по России и за границу.
                    Мы предлагаем разнообразные маршруты для любителей приключений,
                    культурных открытий и комфортного отдыха.
                    </Text>
                    <Text size="18">
                    С нами вы сможете исследовать величественные горы,
                    древние города, золотые пляжи и другие уникальные уголки мира,
                    создавая незабываемые впечатления!
                    </Text>
                </Stack>
                {drawModal(<Shedule />)}
                <Button
                    onClick={changeModal}
                    className={styles.button}
                    cta
                >
                    Расписание туров
                </Button>
                <Country/>
            </Stack>
        </Stack>
    )
}