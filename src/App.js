import Home from './Home';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ThankYou from './ThankYou';

function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/thankyou' element={<ThankYou />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
