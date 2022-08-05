// Import React ES Modules
import { React, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// Import Components, Style, Media
import './App.css';

// Import Pages
import HomePage from './pages/HomePage';
import ViewPage from './pages/ViewPage';

function App() {
  
  // search, setSearch is used for transferring over the user's search from the HomePage to the ViewPage
  const [search, setSearch] = useState('');
  return (
    <>
      <Router>
        <header>
          <Link to="/" className="appLink"><h1>Modern Museum</h1></Link>
        </header>
        
        <main>

          <Route path="/" exact>
            <HomePage setSearch={ setSearch } />
          </Route>

          <Route path="/view">
            <ViewPage search={ search } />
          </Route>

        </main>

        <footer>
          <p>&copy; 2022 Alden Chico</p>
        </footer>


      </Router>
    </>
  );
}

export default App;
