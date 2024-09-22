import React, { useEffect } from 'react';
import BFHLForm from './components/BFHLform';


function App() {
     useEffect(() => {
          document.title = 'AP21110010239';
     }, []);

     return (
          <div className="App">
               <BFHLForm />
          </div>
     );
}

export default App;