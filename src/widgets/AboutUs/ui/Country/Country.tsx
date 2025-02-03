import { Stack } from "@/shared/ui/Stack"
import { Text } from "@/shared/ui/Text"
import { destinationFlags } from "../../lib/data"
import styles from './Country.module.scss';

export const Country = () => {
    return (
        <Stack direction="column"
            align="center" gap="24" max
        >
            <Text size="24" color="blue"
                font="unbounded"
            >Доступные направления</Text>
            <Stack gap="8" max
                justify="between"
                className={styles.country}
            >
                {destinationFlags.map(flag => (
                    <Stack key={flag.id} gap="16"
                        className={styles.flagContainer}>
                        <span className={styles.flag}>{flag.flag}</span>
                        <Stack className={styles.tooltip}>
                            <Text size="18" color="white">{flag.country}</Text>
                        </Stack>
                    </Stack>
                ))}
            </Stack>
        </Stack>
    )
}


