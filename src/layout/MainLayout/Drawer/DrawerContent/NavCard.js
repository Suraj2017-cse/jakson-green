// material-ui
import { Button, Link,  Stack, Typography } from '@mui/material';
// import logoIcon from '../../../../assets/images/cairovision.png';
// project-imports
// import MainCard from 'components/MainCard';

// assets
// import avatar from 'assets/images/users/customer-support-1.png';
// import AnimateButton from 'components/@extended/AnimateButton';
import { Box } from '@mui/system';

// ==============================|| DRAWER CONTENT - NAV CARD ||============================== //

const NavCard = () => (
  <Box sx={{ bgcolor: 'secondary.lighter', m: 3 }}>
    <Stack alignItems="center" spacing={2.5}>
      <Stack alignItems="center">
        <Typography variant="h5">
          <span style={{ color: '#1688C9' }}>Solar</span>
          <span style={{ color: '#ED3237' }}>Vision</span>
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          sx={{ whiteSpace: 'normal', textAlign: 'center', wordBreak: 'break-word', fontSize: '10px', marginTop: '7px' }}
        >
          AI-driven Surveillance & Video Analytics Solutions for solar power plants
        </Typography>
      </Stack>
      <Button variant="contained" size="small" component={Link} href="/" target="_blank" fullWidth sx={{ padding: '8px 16px' }}>
        Logout
      </Button>

      {/* <CardMedia component="img" image={logoIcon} sx={{marginTop: '5px'}}/> */}
    </Stack>
  </Box>
);

export default NavCard;
