import PropTypes from 'prop-types';
import './HoverSocialCard.css';

// material-ui
import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';

// ===========================|| STATISTICS - HOVER SOCIAL CARD ||=========================== //

const HoverSocialCard = ({ primary, secondary, iconPrimary, color, onClick }) => {
  return (
    <Card
      elevation={0}
      sx={{
        background: color,
        position: 'relative',
        color: '#fff',
        cursor: 'pointer', // Makes the card look clickable
        '&:hover svg': {
          opacity: 1,
          transform: 'scale(1)',
        },
      }}
      onClick={onClick} // Pass onClick prop to the card
    >
      <CardContent>
        <Box
          sx={{
            position: 'absolute',
            right: 15,
            top: 15,
            color: '#fff',
            '& .MuiAvatar-root': {
              width: '100%',
              opacity: 0.7,
              transition: 'opacity .3s ease-in-out',
              '&:hover': {
                opacity: 1,
              },
            },
          }}
        >
          <Avatar src={iconPrimary} alt="icon" />
        </Box>

        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Typography variant="h5" color="inherit">
              {secondary}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="inherit">{primary}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

HoverSocialCard.propTypes = {
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired,
  iconPrimary: PropTypes.string.isRequired, // Ensure it's a string path for the icon image
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func, // Added onClick prop
};

export default HoverSocialCard;
