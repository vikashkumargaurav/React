import React from 'react';

// here we are using React Stateless Functional component bcz here we are not handling any event

const Like = (props) => {
    let heartClass = 'fa fa-heart';
    if (props.like !== true) heartClass += '-o';
    return (
        <React.Fragment>
            <i
                onClick={props.onLike}
                style={{cursor: 'pointer'}}
                className={heartClass}
                aria-hidden="true">

            </i>
        </React.Fragment>
    );
};

export default Like;