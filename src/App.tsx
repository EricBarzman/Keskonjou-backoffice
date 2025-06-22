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

import StylesPage from "./pages/style/StylesPage"
import StyleSinglePage from "./pages/style/StyleSinglePage"
import StyleCreateOrEdit from "./pages/style/StyleCreateOrEdit"

import CostumesPage from "./pages/costume/CostumesPage"
import CostumeCreateOrEdit from "./pages/costume/CostumeCreateOrEdit"
import CostumeSinglePage from "./pages/costume/CostumeSinglePage"

import FamiliesPage from "./pages/family/FamiliesPage"
import FamilySinglePage from "./pages/family/FamilySinglePage"
import FamilyCreateOrEdit from "./pages/family/FamilyCreateOrEdit"

import InstrumentsPage from "./pages/instrument/InstrumentsPage"
import InstrumentSinglePage from "./pages/instrument/InstrumentSinglePage"
import InstrumentCreateOrEdit from "./pages/instrument/InstrumentCreateOrEdit"

import SongsPage from "./pages/song/SongsPage"
import SongCreateOrEdit from "./pages/song/SongCreateOrEdit"
import SongSinglePage from "./pages/song/SongSinglePage"

import MusiciansPage from "./pages/musician/MusiciansPage"
import MusicianCreateOrEdit from "./pages/musician/MusicianCreateOrEdit"
import MusicianSinglePage from "./pages/musician/MusicianSinglePage"

import UsersPage from "./pages/user/UsersPage"
import UserCreateOrEdit from "./pages/user/UserCreateOrEdit"
import UserSinglePage from "./pages/user/UserSinglePage"


function App() {

  return (
    <>
      <BrowserRouter>
        <div className='flex flex-row w-screen'>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/people" element={<PeopleCats />} />
            
            <Route path="/people/user" element={<UsersPage />} />
            <Route path="/people/user/add" element={
              <>
                <UsersPage />
                <UserCreateOrEdit />
              </>
            } />
            <Route path="/people/user/:id" element={
              <>
                <UsersPage />
                <UserSinglePage />
              </>
            } />
            <Route path="/people/user/:id/edit" element={
              <>
                <UsersPage />
                <UserCreateOrEdit />
              </>
            } />
            
            <Route path="/people/musician" element={<MusiciansPage />} />
            <Route path="/people/musician/add" element={
              <>
                <MusiciansPage />
                <MusicianCreateOrEdit />
              </>
            } />
            <Route path="/people/musician/:id" element={
              <>
                <MusiciansPage />
                <MusicianSinglePage />
              </>
            } />
            <Route path="/people/musician/:id/edit" element={
              <>
                <MusiciansPage />
                <MusicianCreateOrEdit />
              </>
            } />

            <Route path="/people/band" element={<p>Bands</p>} />

            
            <Route path="/instrument" element={<InstrumentCats />} />
            
            <Route path="/instrument/instrument" element={<InstrumentsPage />} />
            <Route path="/instrument/instrument/add" element={
              <>
                <InstrumentsPage />
                <InstrumentCreateOrEdit />
              </>
            } />
            <Route path="/instrument/instrument/:id" element={
              <>
                <InstrumentsPage />
                <InstrumentSinglePage />
              </>
            } />
            <Route path="/instrument/instrument/:id/edit" element={
              <>
                <InstrumentsPage />
                <InstrumentCreateOrEdit />
              </>
            } />

            <Route path="/instrument/family" element={<FamiliesPage />} />
            <Route path="/instrument/family/add" element={
              <>
                <FamiliesPage />
                <FamilyCreateOrEdit />
              </>
            } />
            <Route path="/instrument/family/:id" element={
              <>
                <FamiliesPage />
                <FamilySinglePage />
              </>
            } />
            <Route path="/instrument/family/:id/edit" element={
              <>
                <FamiliesPage />
                <FamilyCreateOrEdit />
              </>
            } />
            
            
            <Route path="/song" element={<SongCats />} />
            
            <Route path="/song/song" element={<SongsPage />} />
            <Route path="/song/song/add" element={
              <>
                <SongsPage />
                <SongCreateOrEdit />
              </>
            } />
            <Route path="/song/song/:id" element={
              <>
                <SongsPage />
                <SongSinglePage />
              </>
            } />
            <Route path="/song/song/:id/edit" element={
              <>
                <SongsPage />
                <SongCreateOrEdit />
              </>
            } />
            
            
            <Route path="/song/style" element={<StylesPage />} />
            <Route path="/song/style/add" element={
              <>
                <StylesPage />
                <StyleCreateOrEdit />
              </>
            } />
            <Route path="/song/style/:id" element={
              <>
                <StylesPage />
                <StyleSinglePage />
              </>
            } />
            <Route path="/song/style/:id/edit" element={
              <>
                <StylesPage />
                <StyleCreateOrEdit />
              </>
            } />
            
            
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
            
            <Route path="/gig/costume" element={<CostumesPage />} />
            <Route path="/gig/costume/add" element={
              <>
                <CostumesPage />
                <CostumeCreateOrEdit />
              </>
            } />
            <Route path="/gig/costume/:id" element={
              <>
                <CostumesPage />
                <CostumeSinglePage />
              </>
            } />
            <Route path="/gig/costume/:id/edit" element={
              <>
                <CostumesPage />
                <CostumeCreateOrEdit />
              </>
            } />

          </Routes>
        </div >
      </BrowserRouter>
    </>
  )
}

export default App
