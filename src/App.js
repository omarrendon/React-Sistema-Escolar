import React, {useState} from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";

import HomeSistema from "./components/HomeSistema";
import HomeLogin from "./components/HomeLogin";

function App() {
  const [logeo, setLogeo] = useState(true);

  const handleClick = () => {
    console.log("click");
    setLogeo(!logeo);
  };

  return (
    <div>
      
      { logeo ? <HomeLogin /> : <HomeSistema />}
      
      { logeo ?  <button onClick={handleClick} className="btn btn-success">Sistema</button>  : <></>}
      
      
    </div>
  );
}

export default App;
