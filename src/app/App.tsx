import { PortfolioProvider } from '@/app/providers/PortfolioProvider';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { AppLayout } from '@/app/AppLayout';

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <AppLayout />
      </PortfolioProvider>
    </ThemeProvider>
  );
}
