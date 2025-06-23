import { useEffect, useState } from "react"
import type { IMood } from "../../types/song.type"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMoods } from "../../hooks/songs/moodHooks";
import TableOne from "../../components/tableMany/TableOne";
import BackBtn from "../../components/backBtn/backBtn";

function MoodSinglePage() {

  const [mood, setMood] = useState<IMood>();
  const { id } = useParams();
  const location = useLocation();

  const { getMoodById, deleteMood } = useMoods();

  const navigate = useNavigate();

  async function handleDelete() {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm("Voulez-vous vraiment supprimer ce mood ? Cela entraînera une modification des songs liées")) return;
    await deleteMood(id!);
    navigate("/song/mood");
  }

  useEffect(() => {
    getMoodById(id!).then(data => setMood(data));
  }, [location])

  
  if (!mood) return <h2>Mood non trouvé</h2>

  return (
    <aside className='py-6 px-20 border-l w-1/3'>

      <h3 className='font-bold text-xl mb-6'>{mood.name}</h3>

      <div className='py-6 mb-4 flex flex-col'>
        <TableOne item={mood} />
      </div>

      <BackBtn to="/song/mood" label="Mood" />

      <button
        className="p-3 mt-8 bg-red-700 rounded-lg text-white hover:bg-red-800"
        onClick={handleDelete}
      >
        Supprimer
      </button>

    </aside>
  )
}

export default MoodSinglePage