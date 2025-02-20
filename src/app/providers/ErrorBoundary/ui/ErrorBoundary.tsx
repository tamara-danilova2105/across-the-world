import { Button } from '@/shared/ui/Button';
import { Loading } from '@/shared/ui/Loading';
import { Stack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import React, { ErrorInfo, ReactNode, Suspense } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary
    extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.log(error, errorInfo);
    }

    render() {
        const { hasError } = this.state;
        const { children } = this.props;

        if (hasError) {
            return (
                <Suspense fallback={<Loading width='100' height='100' />}>
                    <Stack
                        direction='column' gap='64'
                        justify='center' align='center'
                        style={{ width: '100%', height: 'calc(100vh - 80px)' }}
                    >
                        <Text color='red' size='32'>Упс, что-то пошло не так</Text>
                        <Button
                            onClick={() => window.location.reload()}
                            style={{width: '300px'}}
                        >
                            перезагрузить страницу
                        </Button>
                    </Stack>
                </Suspense>
            );
        }

        return children;
    }
}

export default ErrorBoundary;