import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Button, TextField, Typography } from '@mui/material';
import { FormControl } from '@mui/material';
import AuthorizationContext from '../../store/authorization-context';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { initialFieldValues, errorsFieldValues } from './AuthFormHelpers';
import { checkValidity } from './AuthFormUtils';
import * as cls from './AuthFormSx';

const AuthForm = () => {
  const [errors, setErrors] = useState(errorsFieldValues);
  const [isLogin, setIsLogin] = useState(true);
  const [values, setValues] = useState(initialFieldValues);
  const [open, setOpen] = useState(false);
  const [singInMessage, setSignInMessage] = useState(null);
  const authCtx = useContext(AuthorizationContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    setErrors({
      nameError: false,
      emailError: false,
      passwordError: false,
      confirmationError: false,
    });
    setValues(initialFieldValues);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
        type="button"
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!isLogin) {
      checkValidity(
        values.name,
        setErrors({
          ...errors,
          nameError: true,
        })
      );
      if (values.password !== values.confirmation) {
        setErrors({
          ...errors,
          confirmationError: true,
        });
        return;
      }
    }
    checkValidity(
      values.email,
      setErrors({
        ...errors,
        emailError: true,
      })
    );
    checkValidity(
      values.password,
      setErrors({
        ...errors,
        passwordError: true,
      })
    );
    setErrors({
      nameError: false,
      emailError: false,
      passwordError: false,
      confirmationError: false,
    });
    let url = process.env.REACT_APP_URL;
    if (isLogin) {
      url = `${url}/login`;
    } else {
      url = `${url}/signup`;
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (res.ok && !isLogin) {
          switchAuthModeHandler();
          setSignInMessage('Please login to continue');
        }
        return res.json();
      })
      .then((data) => {
        if (!data.token) {
          setOpen(true);
          setSignInMessage(data.message);
        }
        if (data.token) {
          const expirationTime = new Date(
            new Date().getTime() + data.expiresIn
          );
          const token = data.token;
          const userId = data.userId;
          const isAdmin = data.isAdmin;
          authCtx.login(token, userId, expirationTime.toISOString(), isAdmin);
          navigate(`/profile/${userId}/list`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Grid container sx ={{ marginTop:"100px",  height: '100vh'}} justifyContent="center" >
      <Grid item md={3} justifyContent="center">
        <form onSubmit={submitHandler}>
          <FormControl sx={cls.FormControlSx}>
            <Typography variant="h5" sx={cls.formSubmition}>
              {isLogin ? 'Login' : 'Sign up'}
            </Typography>
            {!isLogin && (
              <TextField
                label="Name"
                name="name"
                variant="filled"
                value={values.name}
                onChange={handleInputChange}
                sx={cls.formInputs}
                error={errors.nameError}
                helperText={errors.nameError && 'Required'}
                autoComplete="off"
              />
            )}
            <TextField
              variant="filled"
              name="email"
              onChange={handleInputChange}
              label="Email"
              value={values.email}
              sx={cls.formInputs}
              type="email"
              error={errors.emailError}
              helperText={errors.emailError && 'Required'}
              autoComplete="off"
            />
            <TextField
              variant="filled"
              onChange={handleInputChange}
              name="password"
              label="Password"
              value={values.password}
              inputProps={{
                type: 'password',
              }}
              sx={cls.formInputs}
              error={errors.passwordError}
              helperText={errors.passwordError && 'Required'}
              autoComplete="off"
            />
            {!isLogin && (
              <TextField
                variant="filled"
                name="confirmation"
                label="Confirm Password"
                inputProps={{
                  type: 'password',
                }}
                value={values.confirmation}
                onChange={handleInputChange}
                sx={cls.formInputs}
                autoComplete="off"
                required
                error={errors.confirmationError}
                helperText={
                  errors.confirmationError && 'Passwrods does not match'
                }
              />
            )}
            <Button sx={cls.submitButton} type="submit">
              {isLogin ? 'Login' : 'Sign up'}
            </Button>
            <Button
              sx={cls.submitButton}
              type="button"
              onClick={switchAuthModeHandler}
            >
              {isLogin ? ' Create new account' : 'Login with existing account'}
            </Button>
          </FormControl>
        </form>
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        message={singInMessage}
        action={action}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom',
        }}
      />
    </Grid>
  );
};

export default AuthForm;
