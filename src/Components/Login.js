import * as React from 'react';
import { useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Alert, TextField } from '@mui/material';
import './Login.css'
import heading from '../Assets/heading.png'
import { makeStyles } from '@mui/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';
import { useState } from 'react';


export default function Login() {
    const store = useContext(AuthContext);
    console.log(store)
    const useStyles = makeStyles({
        descriptionText: {
            color: 'grey',
            textAlign: 'center'
        },
        linkText: {
            color: 'blue',
            textDecoration: 'none',
            textAlign: 'center'
        }
    })

    const classes =  useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {login} = useContext(AuthContext);

    let handleClick = async () => {
        try{
            setError('');
            setLoading(true);
            let res = await login(email, password);
            setLoading(false);
            navigate('/');
        } catch(error) {
            setError(error);
            setTimeout(()=>{
                setError('');
            }, 2000);
            setLoading(false);
        }
    }

    return (
    <div className='login-wrapper'>
        <div className='login-card'>
            <Card variant='outlined'>
                <div className='heading-logo'>
                    <img src = {heading} alt='Instagram'></img>
                </div>
                    <CardContent>
                        {error!='' && <Alert severity="error" fullWidth={true} margin='dense'>This is an error alert — check it out!</Alert>}
                        <div>
                        <TextField
                        required
                        id="standard-required"
                        label="Username"
                        defaultValue=""
                        variant="standard"
                        fullWidth={true}
                        margin='dense'
                        size='small'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        />
                        <TextField
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="standard"
                        fullWidth={true}
                        margin='dense'
                        size='small'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                        </div>
                        <Typography className={classes.linkText} margin='dense'>
                        
                        <Link to=''>Forgot Password?</Link>
                        
                        </Typography>                                           
                    </CardContent>
                <CardActions>
                    <Button color="primary" variant="contained" fullWidth={true} margin='dense' disabled={loading} onClick={handleClick}>
                        Log In
                    </Button>       
                </CardActions>
            </Card>

            <Card variant='outlined'>
                <CardContent>
                    <Typography className={classes.descriptionText} variant="body2" color="text.secondary">
                            Dont' Have an Account? <Link to="/signup">Sign Up</Link>
                    </Typography>  
                </CardContent>
            </Card>
              
              
          
          
          </div>  
      </div>
    );
  }
