import { ClassNames } from '@emotion/react';
import { Button, LinearProgress } from '@mui/material';
import Alert from '@mui/material/Alert';
import React, {useState} from 'react'
import MovieIcon from '@material-ui/icons/Movie'
import {v4 as uuidv4} from 'uuid';
import { database } from '../firebase';
import { storage } from '../firebase';

function UploadFile(props) {
    console.log(props);
    const[error, setError] = useState('');
    const[loading, setLoading] = useState(false);
    const[file, setFile] = useState(null);
    let handleChange = async (file) => {
        if(file == null) {
            setError('Please upload file');
            setTimeout(()=>{
                setError('');
            },2000)

            return;
        }

        if(file.size / (1024 * 1024) > 100) {
            setError('Video uploaded must be less than 100MB');
            setTimeout(()=>{
                setError('');
            },2000)

            return;

        }

        let uid = uuidv4();
        setLoading(true);
        const uploadTask = storage.ref(`/data/posts/${uid}/${file.name}`).put(file);
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
                let obj = {
                    likes:[],
                    comments:[],
                    pId: uid,
                    pUrl: url,
                    uName: props.user.fullName,
                    uProfile: props.user.profileUrl,
                    userId: props.user.userId,
                    createdAt:database.getTimeStamp()
                }
                database.posts.add(obj).then(async (ref)=>{
                    let res = await database.users.doc(props.user.userId).update({
                        postIds: props.user.postIds != null ? [...props.user.postIds, ref.id] : [ref.id]
                    })
                }).then(()=>{
                    setLoading(false);
                }).catch((error)=>{
                    setError(error);
                    setLoading(false);
                    setTimeout(()=>{
                        setError('')
                    },2000)
                })
                })
            }

        setLoading(false);  
    }
    
    return (
        <div>
            {
                error!='' ? <Alert severity='error'>{error}</Alert> 
                :
                <>
                    <input type='file' accept='video/*' onChange={(e)=>handleChange(e.target.files[0])} id='uploadInput' style={{display: 
                    'none'}}/>
                    <label htmlFor='uploadInput'>
                        <Button
                        variant='outlined'
                        color='secondary'
                        component='span'
                        disabled={loading}
                        >
                        <MovieIcon/>&nbsp;Upload Video
                        </Button>
                    </label>
                    {loading && <LinearProgress color='secondary' style={{marginTop: '3%'}}></LinearProgress>} 
                </>

            }
        </div>
    )
}

export default UploadFile
