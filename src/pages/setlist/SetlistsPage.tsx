import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useSetlists } from "../../hooks/songs/setlistHooks";
import type { ISetlist } from "../../types/song.type";

import CreateBtn from "../../components/createBtn/CreateBtn";
import BackBtn from "../../components/backBtn/backBtn"


function SetlistsPage() {

  const location = useLocation();
  const { getSetlists } = useSetlists();
  const [setlists, setSetlists] = useState<ISetlist[]>([])

  useEffect(() => {
    getSetlists().then(setlists => setSetlists(setlists));
  }, [location])

  // if (setlists.length === 0) return <h2>Aucun setlist trouvé</h2>

  return (
    < main className='py-6 px-20 w-1/3' >

      <h3 className='font-bold text-xl mb-6'>Setlists</h3>

      <div className="w-1/2 mb-5">
        <BackBtn to="/song" label="Song catégories" />
      </div>

      <CreateBtn link="/setlist/setlist/add" />

      {/* Table liste */}
      {setlists.length > 0 && (
        <div className='py-6'>
          <table className="border-collapse text-left">
            <thead>
              <tr>
                <th className="border border-gray-500 p-3">Index</th>
                <th className="border capitalize border-gray-500 p-3">Title</th>
                <th className="border border-gray-500 p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {setlists.map((setlist, index) => (
                <tr key={setlist.id}>
                  <td className="border border-gray-500 p-3">{index + 1}</td>
                  <td className="border border-gray-500 p-3">{setlist.title}</td>
                  <td className="border border-gray-500 p-3 hover:bg-amber-300">
                    <Link to={`/song/setlist/${setlist.id}`}>Voir</Link>
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

export default SetlistsPage