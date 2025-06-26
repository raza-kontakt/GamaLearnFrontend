import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = i18n.dir(lng);
    handleClose();
  };

  return (
    <AppBar position="static" sx={{ borderRadius: 0 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <span style={{ marginRight: 4 }}>📚</span> {t('header.title')}
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button
            color="inherit"
            onClick={() => changeLanguage(i18n.language === 'en' ? 'ar' : 'en')}
          >
            {i18n.language === 'en' ? 'العربية' : 'English'}
          </Button>
        </Box>

        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem
              onClick={() =>
                changeLanguage(i18n.language === 'en' ? 'ar' : 'en')
              }
            >
              {i18n.language === 'en' ? 'العربية' : 'English'}
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
