import './App.css';
import ButtonCreator from './components/ButtonCreator';
import 'animate.css'
import { useEffect, useState } from 'react';

function App() {

  const [visible, setVisible] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setVisible(false)
    }, 3000);
  }, [])

  return (
    <div style={{position:'relative'}}>
      <h1 style={{ marginTop: 35 }} className="App animate__animated animate__fadeInTopLeft"><strong><i><span style={{ color: 'red' }}>R</span><span style={{ color: 'green' }}>G</span><span style={{ color: 'blue' }}>B</span></i> CALCULATOR</strong> </h1>
      {
        visible && <h3 className="App animate__animated animate__flash" style={{ marginTop:'7px',marginLeft:'42%',  position:'absolute'}}> Press ⚡ to Turn On/Off!</h3>
      }
      <div style={{ marginTop: 75 }} className="App animate__animated animate__fadeInBottomRight">
        <ButtonCreator />
      </div>
    </div>
  );
}

export default App;
