import { Stack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import styles from './IncludedInPrice.module.scss';

interface IncludedInPriceProps {
    details: {
        included: string;
        notIncluded: string
    }
};

const getText: Record<'included' | 'notIncluded', string> = {
    included: 'Включено',
    notIncluded: 'Не включено'
}

export const IncludedInPrice = (props: IncludedInPriceProps) => {
    const { details } = props;

    return (
        <Stack
            direction="column" 
            gap='24' max
        >
            <Text size='24' font='geometria500'>Включено в стоимость</Text>

            {Object.entries(details).map(([key, value]) => 
                <>
                    <Text size="14" color='blue' font='unbounded'>
                        {getText[key as 'included' | 'notIncluded']}
                    </Text>
                    <div
                        dangerouslySetInnerHTML={{
                        __html: value,
                        }}
                        className={key === 'included' ? styles.includedList : styles.notIncludedList}
                    />
                </>
            )}
        </Stack>
    );
};