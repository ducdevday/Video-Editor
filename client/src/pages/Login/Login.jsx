import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Alert,
    Snackbar,
    Button,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    styled,
    TextField,
} from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import { Auth } from '~/contexts/authContext';
import httpRequest from '../../util/HttpRequest.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signIn } from '~/app/authSlice.js';

const ColorButton = styled(Button)(({ theme }) => ({
    color: 'white',
    margin: 10,
    marginTop: 30,
    backgroundColor: '#000000',
    borderRadius: 5,
    '&:hover': {
        backgroundColor: '#2C2C2C',
    },
}));
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = useState(false);
    const [Message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleClose = () => {
        setOpen(false);
    };
    const dispatch = useDispatch();
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleSubmit = async () => {
        try {
            console.log(email, password);
            // const { data } = await httpRequest.post('/api/auth/signin', {
            //     email,
            //     password,
            // });
            dispatch(signIn({ email, password }));
            // localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/');
        } catch (err) {
            setMessage('Invalid Email or Password');
            setOpen(true);
        }
    };
    return (
        <Grid container>
            <Grid item xs={3} sx={{ textAlign: 'center', marginTop: '200px' }}>
                <h2>Welcome To Video Editor</h2>
                <div style={{ fontSize: 13 }}>
                    <p>powered by</p>
                    <p>Nguyen Minh Duc</p>
                    <p>Vu Thanh Sang</p>
                </div>
            </Grid>
            <Grid item xs={5}>
                <img
                    src="https://s3-alpha-sig.figma.com/img/5132/3b6b/400eadafbae9c466368f9e302fc36898?Expires=1681689600&Signature=kWm4xR9VdTOxKudB8hCwXlbz1x~C9D7Sa6lh19Aw8H2NxgOb6HYAh50SsDPbzrnXTG7JCwYUQKoKJV8eXIX2chpzsVNuakyPnPbYLuZxo2uvZ~yJjfEf5PWhEZ5rR4ul5~uLU8O5A63NcqgoTNQjcligXqBcIs3lnBRZB-6eHAZHYnEo42NTT5SdtAOaJ-Ftl4A-hqd4r9jXz6skorfyG3F8hJbNhiuSspsarkpkpyIIKOVlIHJVD3iMbouMu1gZFTiMm8j-KFuI~dCBJhqKkmTmZNmcUu59fnRHraZLBqqIp7lotw3kU1pbeKvITYaGMUIY5qGDrD88uijpAmWhPA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                    alt="img"
                    style={{ marginTop: '100px', width: '100%', height: '100%', objectFit: 'center' }}
                ></img>
            </Grid>
            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                <FormControl sx={{ m: 1, width: '20ch', marginTop: '200px' }} variant="filled">
                    <TextField
                        label="Email"
                        sx={{ margin: 1 }}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <TextField
                        label="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        sx={{ margin: 1 }}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <div style={{ display: 'flex', alignContent: 'space-between' }}>
                        <div
                            style={{ fontSize: 12, margin: '8px', cursor: 'pointer' }}
                            onClick={() => {
                                navigate('/register');
                            }}
                        >
                            {' '}
                            Don't have an account? Register here!
                        </div>
                        {/* <a href="/home" style={{ fontSize: 12 }}>
                            Forgot Password?
                        </a> */}
                    </div>
                    <ColorButton variant="contained" onClick={handleSubmit}>
                        Sign In
                    </ColorButton>
                </FormControl>
            </Grid>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                    {Message}
                </Alert>
            </Snackbar>
        </Grid>
    );
}

export default Login;
