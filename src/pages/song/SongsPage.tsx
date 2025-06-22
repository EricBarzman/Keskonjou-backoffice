import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useSongs } from "../../hooks/songs/songHooks";
import type { ISong } from "../../types/song.type";

import CreateBtn from "../../components/createBtn/CreateBtn";
import BackBtn from "../../components/backBtn/backBtn"


function SongsPage() {

  const location = useLocation();
  const { getSongs } = useSongs();
  const [songs, setSongs] = useState<ISong[]>([])

  useEffect(() => {
    getSongs().then(songs => setSongs(songs));
  }, [location])

  // if (songs.length === 0) return <h2>Aucun song trouvé</h2>

  return (
    < main className='py-6 px-20 w-1/2' >

      <h3 className='font-bold text-xl mb-6'>Songs</h3>

      <div className="w-1/2 mb-5">
        <BackBtn to="/song" label="Song catégories" />
      </div>

      <CreateBtn link="/song/song/add" />

      {/* Table liste */}
      {songs.length > 0 && (
        <div className='py-6'>
          <table className="border-collapse text-left">
            <thead>
              <tr>
                <th className="border border-gray-500 p-3">Index</th>
                <th className="border capitalize border-gray-500 p-3">Name</th>
                <th className="border border-gray-500 p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {songs.map((song, index) => (
                <tr key={song.id}>
                  <td className="border border-gray-500 p-3">{index + 1}</td>
                  <td className="border border-gray-500 p-3">{song.title}</td>
                  <td className="border border-gray-500 p-3 hover:bg-amber-300">
                    <Link to={`/song/song/${song.id}`}>Voir</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}

export default SongsPage