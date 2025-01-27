import { Stack } from "@/shared/ui/Stack/Stack";
import { dataBlog } from "@/widgets/NewsBlog/lib/data";
import styles from './BlogsGrid.module.scss'
import { Cards } from "../Cards/Cards";


export const BlogsGrid = () => {

    const determineVariant = (index: number): 'large' | 'medium' | 'image' => {
        if (index % 6 === 0 || (index - 6) % 6 === 0) {
            return 'large';
        }
        if ((index - 1) % 2 === 0 || (index - 6) % 3 === 0) {
            return 'image';
        }
        return 'medium';
    }


    const determineColorScheme = (index: number): 'pink' | 'peach' | 'white' | 'blue' => {
        const colorSchemes: Array<'pink' | 'peach' | 'white' | 'blue'> = ['pink', 'peach', 'white', 'blue'];
        return colorSchemes[index % colorSchemes.length];
    };

    return (
        <Stack
            className={styles.grid}
            gap='32'
            wrap
        >
            {dataBlog.map((news, index) => (
                <Cards
                    key={news._id}
                    news={news}
                    variant={determineVariant(index)}
                    colorScheme={determineColorScheme(index)}
                />
            ))}
        </Stack>
    )
}