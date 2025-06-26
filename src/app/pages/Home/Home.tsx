import { Box } from '@mui/material';
import { HeroSection } from './components/HeroSection';
import { StatsSection } from './components/StatsSection';
import { FeaturesSection } from './components/FeaturesSection';
import { TechnologySection } from './components/TechnologySection';

function Home() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <TechnologySection />
      </Box>
    </Box>
  );
}

export default Home;
