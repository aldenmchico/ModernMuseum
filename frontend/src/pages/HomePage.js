// Import React ES Modules
import React from 'react';
import {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

function HomePage( {setSearch} ) {

    const history = useHistory();
    const [inputSearch, setInputSearch] = useState('');
    
    const goToView = async () => {
        setSearch(inputSearch);
        history.push('/view');
    }

    return(
        <>
            <article>
                
                    <fieldset>
                        <form onSubmit={(e) => { e.preventDefault();}}>
                            <div className="inputGrid">
                                <div className="input">
                                    <input
                                        type="text"
                                        value={inputSearch}
                                        onChange={e => setInputSearch(e.target.value)}
                                    />
                                </div>
                                <div className="submit">
                                    <button
                                        type="submit"
                                        onClick={goToView}
                                    >
                                    Find Art
                                    </button>
                                </div>
                            </div>
                        </form>
                    </fieldset>
            </article>
        </>
    )
}

export default HomePage;