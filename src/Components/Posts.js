import { Avatar, CircularProgress } from '@mui/material';
import React, { useState , useEffect} from 'react'
import { database } from '../firebase';
import Video from './Video';
import './Posts.css'
import Like from './Like';
import ChatIcon from '@mui/icons-material/Chat';
import SimpleDialog from '@mui/material/Dialog';
import Like2 from './Like2';
import { Card } from '@mui/material';
import { Typography } from '@mui/material';
import Comments from './Comments';
import AddComment from './AddComment';

function Posts({userData}) {
    const[posts, setPosts] = useState([]);
    const[open, setOpen] = useState(null);
    const[close, setClose] = useState(null);

    const handleClickOpen = (id) => {
        setOpen(id);
      };
    

    useEffect(() => {
        let parr = [];
        const unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot((querysnapshot)=>{
            parr =[];
            console.log(querysnapshot);
            querysnapshot.docs.forEach((doc) => {
                let data = {...doc.data(), postId:doc.id}
                parr.push(data);
            })
            console.log(`parr, ${parr[0]}`);
            setPosts(parr);
            console.log(posts);
        })

        return () => {
            unsub();
        }
    }, [])
    return (
        <div>
            {
                posts==null || userData==null ?
                <CircularProgress/>
                :
                <div className='reel-container'>
                    {
                        posts.map((post, index)=>{
                            return (<React.Fragment key={index}>
                                <div className='reel'>
                                    <Video src={post.pUrl}/>
                                    <div className='fa'style={{display: 'flex'}}>
                                        <Avatar alt='' src={userData.profileUrl}/>
                                        <h4>{userData.fullName}</h4>
                                    </div>
                                    <Like postData = {post} userData = {userData}></Like>
                                    <ChatIcon className={'chat-box-icon'} onClick={()=>handleClickOpen(post.pId)}></ChatIcon>
                                    <SimpleDialog 
                                    fullWidth={true} 
                                    maxWidth={'md'}
                                    open={open==post.pId}
                                    >
                                       <div className="modal-container">
                                            <div className="video-modal">
                                                <video autoPlay={true} muted="muted" controls>
                                                    <source src={post.pUrl}/>
                                                </video>
                                            </div>
                                            <div className="comment-modal">
                                            <Card className="card1" style={{padding:'1rem'}}>
                                                <Comments postData={post}/>
                                            </Card>
                                                <Card variant="outlined" className="card2">
                                                    <Typography style={{padding:'0.4rem'}}>{post.likes.length==0?'Liked by nobody':`Liked by ${post.likes.length} users`}</Typography>
                                                    <div style={{display:'flex'}}>
                                                        <Like2 postData={post} userData={userData} style={{display:'flex',alignItems:'center',justifyContent:'center'}}/>
                                                        <AddComment style={{display:'flex',alignItems:'center',justifyContent:'center'}} userData={userData} postData={post}/>
                                                    </div>
                                                </Card>
                                            </div>
                                        </div>
                                    </SimpleDialog>
                                </div>
                            </React.Fragment>)
                        })
                    }
                </div> 
            }
        </div>
    )
}

export default Posts
