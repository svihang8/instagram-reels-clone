import * as React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Alert, TextField } from '@mui/material';
import './Signup.css'
import heading from '../Assets/heading.png'
import { makeStyles } from '@mui/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Link , useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';
import { database } from '../firebase';
import { storage } from '../firebase';

export default function Signup() {
    const useStyles = makeStyles({
        descriptionText: {
            color: 'grey',
            textAlign: 'center'
        }
    })

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useNavigate();

    const {signup} = useContext(AuthContext);

    const classes =  useStyles();

    const handleClick = async () => {
        if (file == null) {
            setError('Please upload profile image first');
            setTimeout(()=>{
                setError('');
            }, 2000);
            return;
        }
        try {
            setError('');
            setLoading(true);
            let userObj = await signup(email, password);
            let uid = userObj.user.uid;
            const uploadTask = storage.ref(`/data/users/${uid}/ProfileImage`).put(file);
            uploadTask.on('state_changed',fn1, fn2, fn3);
            function fn1(snapshot) {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress} done.`);
            }
    
            function fn2(error) {
                console.log(`error, ${error}`);
                setError(error);
                setTimeout(()=>{
                    setError('');
                }, 2000);
                setLoading(false);
                return;                
            }
    
            function fn3() {
                uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
                    console.log(url);
                    database.users.doc(uid).set({
                        email: email, 
                        userId: uid,
                        fullName: name, 
                        profileUrl: url,
                        createdAt: database.getTimeStamp()
                    })
                })
            }

            setLoading(false);
            history('/');
        } catch (error) {
            setError(error);
            setTimeout(()=>{
                setError('');
            }, 2000);           
        }
    }

    return (
    <div className='signup-wrapper'>
        <div className='signup-card'>
            <Card variant='outlined'>
                <div className='heading-logo'>
                    <img src = {heading} alt='Instagram'></img>
                </div>
                    <CardContent>
                        <Typography className={classes.descriptionText} variant="body2" color="text.secondary">
                            Sign up to see photos and videos from your friends.
                        </Typography>
                        {error!='' && <Alert severity="error" fullWidth={true} margin='dense'>{error}</Alert>}
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
                        value = {email}
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
                        value = {password}
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                        <TextField
                        label="Full Name"
                        defaultValue=""
                        variant="standard"
                        fullWidth={true}
                        margin='dense'
                        size='small'
                        value = {name}
                        onChange={(e)=>setName(e.target.value)}
                        />
                        </div>
                        <div>
                        <Button color="secondary" fullWidth={true} variant='outlined' margin='dense' startIcon={<CloudUploadIcon/>} component='label'>
                            <input type='file' accept='images/*' hidden onChange={(e)=>setFile(e.target.files[0])}></input>
                            Upload profile image
                        </Button>
                        </div>                                           
                    </CardContent>
                <CardActions>
                    <Button color="primary" variant="contained" fullWidth={true} margin='dense' disabled={loading} onClick={handleClick}>
                        Sign Up
                    </Button>       
                </CardActions>
                <CardContent>
                    <Typography className={classes.descriptionText} variant="body2" color="text.secondary">
                            By signing up, you agree to the terms and conditions.(LOL!, Data)
                    </Typography>                      
                </CardContent>
            </Card>

            <Card variant='outlined'>
                <CardContent>
                    <Typography className={classes.descriptionText} variant="body2" color="text.secondary">
                            Already have an account? <Link to="/login">Log in</Link>
                    </Typography>  
                </CardContent>
            </Card>
              
              
          
          
          </div>  
      </div>
    );
  }
