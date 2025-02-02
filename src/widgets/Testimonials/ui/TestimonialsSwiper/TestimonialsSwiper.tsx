import { useCallback, useMemo } from 'react';
import { CustomeSwiper } from '@/shared/ui/CustomeSwiper';
import { useMaxHeight } from '@/shared/hooks/useMaxHeight';
import { useResize } from '@/shared/hooks/useResize';
import { DataTestimonial, dataTestimonials } from '../../lib/data';
import { TestimonialItem } from '../TestiminialItem/TestiminialItem';

const MAX_HEIGHT_DEFAULT = 420;
const MAX_HEIGHT_MOBILE_SMALL = 500;

export const TestimonialsSwiper = () => {
    const width = useResize();
    const isMobileSmall = width <= 345;

    const initialHeight = useMemo(() => 
        (isMobileSmall ? MAX_HEIGHT_MOBILE_SMALL : MAX_HEIGHT_DEFAULT), [width]
    );

    const { 
        itemRefs, 
        maxHeight, 
        showMoreStates, 
        toggleShowMore 
    } = useMaxHeight(initialHeight, dataTestimonials.length);

    const renderItem = useCallback((testimonial: DataTestimonial, index: number) => (
        <TestimonialItem
            ref={(el) => (itemRefs.current[index] = el)}
            testimonial={testimonial}
            maxHeight={{
                height: maxHeight ? `${maxHeight}px` : 'auto',
            }}
            showMore={showMoreStates[index]}
            onToggleShowMore={() => toggleShowMore(index)}
        />
    ), []);
    
    return (
        <CustomeSwiper<DataTestimonial>
            items={dataTestimonials}
            renderItem={renderItem}
        />
    );
};