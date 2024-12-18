import { Stack } from "@/shared/ui/Stack/Stack"
import { Link, useLocation } from 'react-router-dom';
import { AppRoutesProps } from "@/app/router/types/types";
import { Text } from "@/shared/ui/Text/Text";
import styles from './BreadCrumbs.module.scss'

interface Breadcrumb  {
    title: string;
    link: string;
    isLast?: boolean;
}

interface BreadcrumbsProps {
    routes: AppRoutesProps[];
    separator?: string; 
    isTour?: boolean; 
    name?: string; 
}

export const BreadCrumbs = ({   
    routes,
    separator = ' / ',
    isTour = false,
    name } : BreadcrumbsProps) => {

    const location = useLocation();

    const breadcrumbs : Breadcrumb[] = location.pathname
    .split('/')
    .reduce<Breadcrumb[]>((acc, segment, index, arr) => {
        if (!segment) return acc;

        const prevLink = acc.length > 1 ? acc[acc.length - 1].link : '';
        const link = `${prevLink}/${segment}`;
        const route = routes.find((r) => r.path === link);
        const isLast = index === arr.length - 1;

        if (route) {
            acc.push({
                title: route.title ? route.title : '',
                link: link,
                isLast: isLast,
            });
        }

        return acc;
    }, [{ title: 'Главная', link: '/' }]);

    const currentRoute = breadcrumbs[breadcrumbs.length - 1];
    const title = currentRoute.isLast ? currentRoute.title : '';

    return(
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
                {isTour ? name : title}
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
                                {isTour ? name : crumb.title}
                            </Text>
                            ) : (
                            <Link to={crumb.link}>
                                <Text 
                                    size='24'
                                    color='peach'
                                >
                                    {crumb.title}
                                </Text>
                            </Link>
                            )}
                            {index < breadcrumbs.length - 1 && separator}
                        </Text>
                    ))}
                </ul>
            </nav>
        </Stack>
    );
}

