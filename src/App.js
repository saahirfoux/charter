import React, { useState }  from 'react';
import { Report, Nav, Preview } from "./modules";


function App() {

  const [image, setImage] = useState("default");
  const [details, setDetails] = useState({});

  return (    
    <div className="app">
      <Preview onSelectImage={image} onSelectDetails={details} />
      <>
        <div className="content__container">
          <Nav/>
          <Report onSelectImage={setImage} onSelectDetails={setDetails} />
        </div>
      </>
    </div>
  );
}

export default App;
