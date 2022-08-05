import React from 'react';
import SingleImage from '../components/SingleImage';

function ImagePanel({artObjects}) {
    return (
        <> 
            <div className="grid">
            {artObjects.map((artObject, i) =>
            <SingleImage
                artObject={artObject}
                itemName={"item-"+i}
                key={i}
            />)}
            </div>
        </>
    )
}

export default ImagePanel;