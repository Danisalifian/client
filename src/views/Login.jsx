import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {Link as reactLink} from 'react-router-dom'

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import axios from 'axios'

import BgImage from '../assets/background.jpg'
import { useState } from 'react';
import auth from '../auth';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url('+BgImage+')',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: '1000px',
    backgroundPosition: 'center',
    // width:100,
    // height:140
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login(props) {
  const classes = useStyles();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailval, setEmailval] = useState("")
  const [passval, setPassval] = useState("")

  useEffect(() => {
    const url = "http://localhost:5000/api/users/";

    axios.get(url).then(res => {
      const datas = res.data

      // console.log(datas)
      datas.map(obj => {
        const emailval = obj.email
        const passval = obj.password
        setEmailval(emailval)
        setPassval(passval)
      })
    })
  })

  const validasi = () => {

    if ((email==='') && (password==='')) {
      console.log('Silahkan lengkapi field yang masih kosong')
    } else {
      if ((email===emailval) && (password===passval)) {
        // console.log('Berhasil login')
        // setValid(!valid)
        auth.login(() => {
          props.history.push("/dashboard")
        })
        
      } else {
        // console.log('gagal login')
        handleClickOpen()
        setEmail("")
        setPassword("")
      }
    }
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }; 

  return (
    <div>
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              // type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              component={reactLink} 
              onClick={validasi}
              // onClick = {
              //   () => {
              //     auth.login(() => {
              //       props.history.push("/dashboard")
              //     })
              //   }
              // }
            >
              Sign In
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
    
    {/* DIALOG */}
    <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Maaf email atau password yang anda masukkan salah, silahkan coba lagi
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default(Login)