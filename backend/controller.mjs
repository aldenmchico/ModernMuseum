import express from 'express';
import asyncHandler from 'express-async-handler';
import axios from 'axios';
import 'dotenv/config';

const PORT = process.env.PORT;
const app = express();
// Sets Content-Type to application/json for every HTTP method
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

const metMuseumDomain = 'https://collectionapi.metmuseum.org/public/collection/v1';

// Sleep function to stop from querying database too fast
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

// GET a list of art objects by querying the Met Museum. Allow search to specify how many objects to return. 
// The last index from the objectIDs list is sent in the response. This is useful for loading new items on the website.

app.get('/search/:_query/start/:_idxStart/num_imgs/:_numImgs', asyncHandler (async (req, res, next) => {
    
    const searchQuery = req.params._query;
    
    // Use the query to return a list of object IDs
    const objectList = await axios.get(`${metMuseumDomain}/search?q=${searchQuery}`);
    const objectIDs = objectList.data.objectIDs;
    // Make sure idxStart and idxEnd are within the array indexing range
    let idxStart = req.params._idxStart;
    let numImgs = req.params._numImgs;


    // Use the object IDs to return a list of art objects with their relevant information for the website
    let returnObject = [];
    let artObject = {};
    let metObject = {};
    let objectID = '';
    let title = '';
    let artistDisplayName = '';
    let primaryImage = '';
    let primaryImageSmall = '';
    let objectURL = '';
    
    let i = parseInt(idxStart);
    let imgsFound = 0;
    while (imgsFound < numImgs && i < objectIDs.length) {
        try {
            metObject = await axios.get(`${metMuseumDomain}/objects/${objectIDs[i]}`);
            objectID = metObject.data.objectID;
            title = metObject.data.title;
            artistDisplayName = metObject.data.artistDisplayName;
            primaryImage = metObject.data.primaryImage;
            // If there's no image that can be displayed, skip the image and query for the next one
            if (primaryImage.length < 1) {
                i += 1;
                continue;
            }
            primaryImageSmall = metObject.data.primaryImageSmall;
            objectURL = metObject.data.objectURL;
            artObject = { objectID, title, artistDisplayName, primaryImage, primaryImageSmall, objectURL };
            returnObject.push(artObject);
            // If an image was found from the metObject, increment both the loop counter and the indexer
            i += 1;
            imgsFound += 1;
            // Met Museum asks users to query at a max rate of 80 queries / second. 1000ms / 80queries ~= 13 ms / query
            sleep(13);
        } catch (error) {
            // If there was an error in processing the request, move on to the next met object
            i += 1;
            continue;
        }
    }
    // Include the last index pushed in the response.
    returnObject.push(i);
    res.status(200).json(returnObject);
}));
