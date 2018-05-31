import React from 'react';
import {MuiThemeProvider, createMuiTheme, withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const theme = createMuiTheme({
  overrides: {
    MuiAppBar: {
      // Name of the styleSheet
      colorPrimary: {
        // Name of the rule
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        backgroundColor: '#312f2f',
      },
    },
  },
});

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
        <AppBar position="static" color='primary'>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Деловая Афиша
            </Typography>
            <Button color="inherit">Войти</Button>
          </Toolbar>
        </AppBar>
      </MuiThemeProvider>
    </div>
  );
}

export default withStyles(styles)(ButtonAppBar);
