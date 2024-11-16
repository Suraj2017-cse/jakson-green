import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

// Material-UI imports
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Box, Container, Toolbar, Breadcrumbs } from '@mui/material';

// Project imports
import Drawer from './Drawer';
import Header from './Header';
// import Footer from './Footer';
import HorizontalBar from './Drawer/HorizontalBar';

import { DRAWER_WIDTH } from 'config';
import useConfig from 'hooks/useConfig';
import { dispatch } from 'store';
import { openDrawer } from 'store/reducers/menu';
import { MenuOrientation } from 'config';

const MainLayout = () => {
  const theme = useTheme();
  const downXL = useMediaQuery(theme.breakpoints.down('xl'));
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const { container, miniDrawer, menuOrientation } = useConfig();

  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  // Set responsive drawer state
  useEffect(() => {
    if (miniDrawer) {
      dispatch(openDrawer(true));
    } else if (!miniDrawer && !downXL) {
      dispatch(openDrawer(false));
    }
  }, [downXL, miniDrawer]);

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header />
      {!isHorizontal ? <Drawer /> : <HorizontalBar />}

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: isHorizontal ? '100%' : `calc(100% - ${miniDrawer ? DRAWER_WIDTH : 0}px)`,
          transition: 'width 0.3s',
          p: { xs: 2, md: 3 },
        }}
      >
        {/* Adjust Toolbar for spacing */}
        <Toolbar sx={{ mt: isHorizontal ? 8 : 'inherit', mb: isHorizontal ? 2 : 'inherit' }} />
        <Container
          maxWidth={container ? 'xl' : false}
          sx={{
            px: container ? { xs: 0, md: 2 } : 0,
            position: 'relative',
            minHeight: 'calc(100vh - 110px)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Breadcrumbs navigation={navigation} title titleBottom card={false} divider={false} />
          <Outlet />
          {/* <Footer /> */}
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
