import { LocaleProvider } from '@/app/providers/LocaleProvider';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { PortfolioProvider } from '@/app/providers/PortfolioProvider';
import { AppLayout } from '@/app/AppLayout';

export default function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <PortfolioProvider>
          <AppLayout />
        </PortfolioProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}
