import { SearchX } from 'lucide-react';
import { Stack } from "@/shared/ui/Stack/Stack"
import { Text } from '@/shared/ui/Text/Text';
import { motion } from "framer-motion";
import styles from "./NoResults.module.scss"

export const NoResults = () => {

    return (
        <Stack
            direction='column'
            align='center'
            justify='center'
            gap='32'
            max
            className={styles.badSearch_container}
        >
            <motion.div 
                className={styles.iconWrapper}
                animate={{ rotate: [0, -5, 5, -5, 0] }} 
                transition={{ duration: 0.6, repeat: 1, ease: "easeInOut" }}
            >
                <SearchX />
            </motion.div>
            <Stack
                direction='column'
                align='center'
                gap='16'
                className={styles.textBlock}
            >
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.5 }}
                >
                    <Text 
                        type='h2' size='18' 
                        font='geometria500' 
                        color='blue'
                    >
                        Нет подходящих туров
                    </Text>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Text size='18'>
                        Попробуйте изменить условия поиска
                    </Text>
                </motion.div>
            </Stack>
        </Stack>
    )
}
