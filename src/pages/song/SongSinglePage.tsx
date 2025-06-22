import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useSongs } from "../../hooks/songs/songHooks";
import type { ISong } from "../../types/song.type"

import TableOne from "../../components/tableMany/TableOne";
import BackBtn from "../../components/backBtn/backBtn";

function SongSinglePage() {

  const [song, setSong] = useState<ISong>();
  const { id } = useParams();
  const location = useLocation();

  const { getSongById, deleteSong } = useSongs();

  const navigate = useNavigate();

  async function handleDelete() {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm("Voulez-vous vraiment supprimer ce song ?")) return;
    await deleteSong(id!);
    navigate("/gig/song");
  }

  useEffect(() => {
    getSongById(id!).then(data => setSong(data));
  }, [location])

  
  if (!song) return <h2>Song non trouvé</h2>

  return (
    <aside className='py-6 px-20 border-l w-1/3'>

      <h3 className='font-bold text-xl mb-6'>{song.name}</h3>

      <div className='py-6 mb-4 flex flex-col'>
        <TableOne item={song} />
      </div>

      <BackBtn to="/gig/song" label="Song" />

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