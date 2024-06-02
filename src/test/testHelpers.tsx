import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface WrapperProps {
  children: ReactNode;
}

export const createQueryWrapper = () => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

  const WrapperComponent = ({ children }: WrapperProps) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return WrapperComponent;
};
