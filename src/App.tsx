import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<p>Home</p>}/>
          <Route path="/user" element={<p>Users</p>}/>
          <Route path="/musician" element={<p>Musicians</p>}/>
          <Route path="/band" element={<p>Bands</p>}/>
          <Route path="/family" element={<p>Famille d'instrument</p>}/>
          <Route path="/instrument" element={<p>Instrument</p>}/>
          <Route path="/style" element={<p>Style</p>}/>
          <Route path="/mood" element={<p>Mood</p>}/>
          <Route path="/costume" element={<p>Costume</p>}/>
          <Route path="/song" element={<p>Song</p>}/>
          <Route path="/setlist" element={<p>Setlist</p>}/>
          <Route path="/gig" element={<p>Gig</p>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
