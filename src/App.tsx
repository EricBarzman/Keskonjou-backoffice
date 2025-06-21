import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/header/header"
import Home from "./pages/home/Home"
import PeopleCats from "./pages/peopleCats/PeopleCats"
import InstrumentCats from "./pages/instrumentCats/InstrumentCats"
import SongCats from "./pages/songCats/SongCats"
import GigCats from "./pages/gigCats/GigCats"
import MoodsPage from "./pages/mood/MoodsPage"
import MoodSinglePage from "./pages/mood/MoodSinglePage"
import MoodCreateOrEdit from "./pages/mood/MoodCreateOrEdit"

function App() {

  return (
    <>
      <BrowserRouter>
        <div className='flex flex-row w-screen'>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/people" element={<PeopleCats />} />
            <Route path="/people/user" element={<p>Users</p>} />
            <Route path="/people/musician" element={<p>Musicians</p>} />
            <Route path="/people/band" element={<p>Bands</p>} />

            <Route path="/instrument" element={<InstrumentCats />} />
            <Route path="/instrument/instrument" element={<p>Instrument</p>} />
            <Route path="/instrument/family" element={<p>Famille d'instrument</p>} />

            <Route path="/song" element={<SongCats />} />
            
            
            <Route path="/song/song" element={<p>Song</p>} />
            
            
            <Route path="/song/style" element={<p>Style</p>} />
            
            
            <Route path="/song/mood" element={<MoodsPage />} />
            <Route path="/song/mood/add" element={
              <>
                <MoodsPage />
                <MoodCreateOrEdit />
              </>
            } />
            <Route path="/song/mood/:id" element={
              <>
                <MoodsPage />
                <MoodSinglePage />
              </>
            } />
            <Route path="/song/mood/:id/edit" element={
              <>
                <MoodsPage />
                <MoodCreateOrEdit />
              </>
            } />
            
            
            <Route path="/song/setlist" element={<p>Setlist</p>} />

            <Route path="/gig" element={<GigCats />} />
            <Route path="/gig/gig" element={<p>Gig</p>} />
            <Route path="/gig/costume" element={<p>Costume</p>} />

          </Routes>
        </div >
      </BrowserRouter>
    </>
  )
}

export default App
