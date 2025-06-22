import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import { useSongs } from "../../hooks/songs/songHooks";
import type { ISongNested } from "../../types/song.type"

import BackBtn from "../../components/backBtn/backBtn";

function SongSinglePage() {

  const [song, setSong] = useState<ISongNested>();
  const { id } = useParams();
  const location = useLocation();

  const { getSongByIdNested, deleteSong } = useSongs();

  const navigate = useNavigate();

  async function handleDelete() {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm("Voulez-vous vraiment supprimer ce song ?")) return;
    await deleteSong(id!);
    navigate("/gig/song");
  }

  useEffect(() => {
    getSongByIdNested(id!).then(data => setSong(data));
  }, [location])

  if (!song) return <h2>Song non trouvé</h2>

  return (
    <aside className='py-6 px-20 border-l w-1/3'>

      <h3 className='font-bold text-xl mb-6'>{song.name}</h3>

      {/* Table One */}
      <div className='py-6 mb-4 flex flex-col'>
        <table className="border-collapse text-left">
          <thead>
            <tr>
              <th className="border capitalize border-gray-500 p-3">Title</th>
              <th className="border capitalize border-gray-500 p-3">Duration</th>
              <th className="border capitalize border-gray-500 p-3">Style</th>
              <th className="border capitalize border-gray-500 p-3">Mood</th>
              <th className="border capitalize border-gray-500 p-3">Instruments NOT required</th>
              <th className="border capitalize border-gray-500 p-3">Is there a solo?</th>
              <th className="border capitalize border-gray-500 p-3">Partition path</th>
              <th className="border border-gray-500 p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr >
              <td className="border border-gray-500 p-3">{song.title}</td>
              <td className="border border-gray-500 p-3">
                {!song.duration ? "Non indiqué" : `${Math.floor(song.duration / 60)} min ${song.duration % 60} sec` }
              </td>
              <td className="border border-gray-500 p-3">{song.style.name}</td>
              <td className="border border-gray-500 p-3">{song.mood.name}</td>
              <td className="border border-gray-500 p-3">
                {song.instrumentsNotRequired?.length === 0
                  ? "N/A"
                  : song.instrumentsNotRequired!.map(i => i.name).join(", ")}
              </td>
              <td className="border border-gray-500 p-3">{song.hasSolo ? "Yes" : "No"}</td>
              <td className="border border-gray-500 p-3">{song.partitionPath !== "" ? song.partitionPath : "N/A"}</td>
              
              <td className="border border-gray-500 p-3 hover:bg-teal-100">
                <Link to={`edit`}>Editer</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <BackBtn to="/song/song" label="Song" />

      <button
        className="p-3 mt-8 bg-red-700 rounded-lg text-white hover:bg-red-800"
        onClick={handleDelete}
      >
        Supprimer
      </button>

    </aside>
  )
}

export default SongSinglePage