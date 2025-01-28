import { Link, useLocation } from 'react-router-dom';
import { useParams } from "react-router";
import { Tour } from "@/widgets/OurTours/lib/data";
import { getTextRegion } from "@/shared/lib/getTextRegion";
import { Stack } from "@/shared/ui/Stack/Stack";
import { Text } from "@/shared/ui/Text/Text";
import styles from './BreadCrumbs.module.scss';
import { routeConfig } from '@/app/router/lib/data';

interface Breadcrumb {
    title: string;
    link?: string;
    isLast?: boolean;
};

interface BreadcrumbsProps {
    isDetails?: boolean;
    name?: string;
    dataTours?: Tour[]
};

const separator = ' / ';

export const BreadCrumbs = ({
    isDetails = false,
    name,
}: BreadcrumbsProps) => {

    const { region } = useParams();
    const location = useLocation();

    const breadcrumbs: Breadcrumb[] = location.pathname
        .split('/')
        .reduce<Breadcrumb[]>((acc, segment, index, arr) => {
            if (!segment) return acc;

            const prevLink = acc.length > 1 ? acc[acc.length - 1].link : '';
            const link = `${prevLink}/${segment}`;
            const route = Object.values(routeConfig).find((r) => r.path === link);
            const isLast = index === arr.length - 1;

            if (route) {
                acc.push({
                    title: route.title ? route.title : '',
                    link: link,
                    isLast: isLast,
                })
            } else if (index === arr.length - 1 && region) {
                acc.push({
                    title: getTextRegion(region),
                    isLast: false,
                });
            }

            return acc;
        }, [{ title: 'Главная', link: '/' }])

    const currentRoute = breadcrumbs[breadcrumbs.length - 1];
    const title = currentRoute.isLast ? currentRoute.title : '';

    return (
        <Stack
            direction='column'
            align='center'
            justify='center'
            gap='24'
            className={styles.pageTitleContainer}
        >
            <Stack
                className={styles.breadCrumbsContainer}
                direction="column"
                align="center"
                gap="16"
            >
                <Text
                    size='32'
                    color='white'
                    type='h2'
                    font='unbounded'
                >
                    {isDetails ? name : title}
                </Text>
                <nav>
                    <ul>
                        {breadcrumbs.map((crumb, index) => (
                            <Text
                                key={crumb.link}
                                type='li'
                                size="24"
                            >
                                {crumb.isLast ? (
                                    <Text
                                        size='24'
                                        color='peach'
                                    >
                                        {isDetails ? name : crumb.title}
                                    </Text>
                                ) : (
                                    crumb.link ? (
                                        <Link to={crumb.link}>
                                            <Text
                                                size='24'
                                                color='peach'
                                            >
                                                {crumb.title}
                                            </Text>
                                        </Link>
                                    ) : (
                                        <Text
                                            size='24'
                                            color='peach'
                                        >
                                            {crumb.title}
                                        </Text>
                                    )
                                )}
                                {index < breadcrumbs.length - 1 && separator}
                            </Text>
                        ))}
                    </ul>
                </nav>
            </Stack>
        </Stack>
    );
};

