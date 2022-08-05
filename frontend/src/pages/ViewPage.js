// Import React ES Modules
import React from 'react';
import {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import ImagePanel from '../components/ImagePanel'

export const ViewPage = ( {search} ) => {

    const [artObjects, setArtObjects] = useState([]);
    const [idxStart, setIdxStart] = useState(0);
    const [newIdx, setNewIdx] = useState();
    const history = useHistory();

    const getArtwork = async() => {
        try {
            const response = await fetch(`/search/${search}/start/${idxStart}/num_imgs/4`);
            let artObjects = await response.json();
            // Remove the index variable from the artObjects JSON object and save the value for later.
            let newIdx = artObjects.pop();
            setNewIdx(newIdx);
            setArtObjects(artObjects);
        } catch (error) {
            history.push("/");
        }
    }
    
    // Load the first 4 art objects from the search when the page first loads
    useEffect(() => { 
        getArtwork(); 
    }, []);

    // Refresh the page when the value of idxStart is changed
    useEffect(() => { 
        getArtwork(); 
    }, [idxStart]);

    // Change the value of idxStart to the saved index value when the user clicks the next button.
    const newArtwork = async() => {
        setIdxStart(newIdx);
    };

    return (
        <>
            <div className="viewGrid">
                <div className="imagePanel">        
                <ImagePanel
                    artObjects={artObjects}
                />
                </div>
                <div className="nextButton">
                <form onSubmit={(e) => { e.preventDefault();}}>
                    <button
                    type="submit"
                    onClick={newArtwork}
                    > &gt;
                    </button>
                </form>
                </div>
            </div>
        </>
    );
}

export default ViewPage;