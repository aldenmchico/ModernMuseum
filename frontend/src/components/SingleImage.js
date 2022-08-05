import React from 'react';

function SingleImage({artObject, itemName}) {
    return (
        <>
            <div className={itemName}>
                <a href={artObject.objectURL} target="_blank" ><img src={artObject.primaryImage}></img></a>
            </div>
        </>
    )

}

export default SingleImage