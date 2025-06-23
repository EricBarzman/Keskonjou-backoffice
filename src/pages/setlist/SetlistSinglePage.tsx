import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import { useSetlists } from "../../hooks/songs/setlistHooks";
import type { ISetlistNested } from "../../types/song.type"

import BackBtn from "../../components/backBtn/backBtn";

function SetlistSinglePage() {

  const [setlist, setSetlist] = useState<ISetlistNested>();
  const { id } = useParams();
  const location = useLocation();

  const { getSetlistByIdNested, deleteSetlist } = useSetlists();

  const navigate = useNavigate();

  async function handleDelete() {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm("Voulez-vous vraiment supprimer ce setlist ?")) return;
    await deleteSetlist(id!);
    navigate("/song/setlist");
  }

  useEffect(() => {
    getSetlistByIdNested(id!).then(data => setSetlist(data));
  }, [location])

  if (!setlist) return <h2>Setlist non trouvé</h2>

  return (
    <aside className='py-6 px-20 border-l w-2/3'>

      <h3 className='font-bold text-xl mb-6'>{setlist.name}</h3>

      {/* Table One */}
      <div className='py-6 mb-4 flex flex-col'>
        <table className="border-collapse text-left">
          <thead>
            <tr>
              <th className="border capitalize border-gray-500 p-3">Title</th>
              <th className="border capitalize border-gray-500 p-3">Duration</th>
              <th className="border capitalize border-gray-500 p-3">Instru NOT required</th>
              <th className="border capitalize border-gray-500 p-3">Setlist of songs</th>
              <th className="border border-gray-500 p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr >

              <td className="border border-gray-500 p-3">
                {setlist.title}
              </td>

              <td className="border border-gray-500 p-3">
                {!setlist.duration ? "Non indiqué" : `${Math.floor(setlist.duration / 60)} min ${setlist.duration % 60} sec`}
              </td>

              <td className="border border-gray-500 p-3">
                {setlist.instrumentsNotRequired?.length === 0
                  ? "-"
                  : setlist.instrumentsNotRequired!.map(i => i.name).join(", ")}
              </td>

              <td className="border border-gray-500 p-3">
                <ol>
                  {setlist.songs.map(song =>
                    <li><span>{Math.floor(song.duration! / 60)} mn {song.duration! % 60}: </span> {song.title}</li>
                  )}
                </ol>
              </td>

              <td className="border border-gray-500 p-3 hover:bg-teal-100">
                <Link to={`edit`}>Editer</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <BackBtn to="/song/setlist" label="Setlist" />

      <button
        className="p-3 mt-8 bg-red-700 rounded-lg text-white hover:bg-red-800"
        onClick={handleDelete}
      >
        Supprimer
      </button>

    </aside>
  )
}

export default SetlistSinglePage