import logo from './logo.svg';
import './App.css';


// react router
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

/* jotai
import { atom, useAtom } from 'jotai'

// Create your atoms and derivatives
const textAtom = atom('hello')
const uppercaseAtom = atom(
  (get) => get(textAtom).toUpperCase()
)

// Use them anywhere in your app
const Input = () => {
  const [text, setText] = useAtom(textAtom)
  const handleChange = (e) => setText(e.target.value)
  return (
    <input value={text} onChange={handleChange} />
  )
}
*/

// components
import Home from './components/Home';
import Overview from './components/Overview';
import NotFound from './components/NotFound';



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Overview />} />
          {/* search page */}
          <Route path="/search" element={<Home />} />
          {/* routes to user profiles */}
          <Route path="/:username" element={<Home />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
