import React, { useState , useEffect} from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderTwoToneIcon from '@mui/icons-material/FavoriteBorderTwoTone';
import {database} from '../firebase';

function Like({postData, userData}) {
    const [like, setLike] = useState(null);
    console.log(postData);
    console.log(userData);
    useEffect(() => {
        
        let check = postData.likes.includes(userData.userId) ? true : false;
        setLike(check);
    }, [postData])


    let handleLike = () => {
        if(like == true) {
            let newLikeArr = postData.likes.filter((id)=>{return id!=userData.userId});
            database.posts.doc(postData.postId).update({
                likes: newLikeArr
            })
        } else {
            let newLikeArr = [...postData.likes, userData.userId];
            database.posts.doc(postData.postId).update({
                likes: newLikeArr
            })             
        }
    }
    return (
        <div>
            {
                like != null ?
                <>
                {
                    like == true ?
                    <FavoriteIcon className={'like icon-styling '} onClick={handleLike}></FavoriteIcon>
                    :
                    <FavoriteIcon className={'unlike icon-styling '} onClick={handleLike}></FavoriteIcon>
                }
                </> 
                :
                <>
                </>
            }
        </div>
    )
}

export default Like
