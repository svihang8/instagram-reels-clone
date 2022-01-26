import React from 'react'
import './Video.css'
import ReactDOM  from 'react-dom';
function Video(props) {
    let handleClick = (e) => {
        e.preventDefault();
        e.target.muted = !e.target.muted;
    }

    let handleScroll = (e) => {
        let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling;
        if(next) {
            next.scrollIntoView();
            e.target.muted = true;
        }
    }
    return (
        <video src={props.src} onEnded={handleScroll} className='reels-styling' muted='muted' onClick={handleClick} controls>
        </video>
    )
}

export default Video
