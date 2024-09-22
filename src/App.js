import React, { useEffect } from 'react';
import BFHLForm from './components/BFHLForm';
import NavBar from './components/navbar';

function App() {
     

     return (
          <div className="App">
               <NavBar/>
               <BFHLForm />
          </div>
     );
}

export default App;