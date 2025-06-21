import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/header/header"
import Home from "./pages/home/Home"

function App() {

  return (
    <>
      <BrowserRouter>
        <div className='flex flex-row w-screen'>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<p>Users</p>} />
            <Route path="/musician" element={<p>Musicians</p>} />
            <Route path="/band" element={<p>Bands</p>} />
            <Route path="/family" element={<p>Famille d'instrument</p>} />
            <Route path="/instrument" element={<p>Instrument</p>} />
            <Route path="/style" element={<p>Style</p>} />
            <Route path="/mood" element={<p>Mood</p>} />
            <Route path="/costume" element={<p>Costume</p>} />
            <Route path="/song" element={<p>Song</p>} />
            <Route path="/setlist" element={<p>Setlist</p>} />
            <Route path="/gig" element={<p>Gig</p>} />
          </Routes>
        </div >
      </BrowserRouter>
    </>
  )
}

export default App
