import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useStyles } from "../../hooks/songs/styleHooks";
import type { IStyle } from "../../types/song.type"

import TableOne from "../../components/tableMany/TableOne";
import BackBtn from "../../components/backBtn/backBtn";

function StyleSinglePage() {

  const [style, setStyle] = useState<IStyle>();
  const { id } = useParams();
  const location = useLocation();

  const { getStyleById, deleteStyle } = useStyles();

  const navigate = useNavigate();

  async function handleDelete() {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm("Voulez-vous vraiment supprimer ce style ?")) return;
    await deleteStyle(id!);
    navigate("/song/style");
  }

  useEffect(() => {
    getStyleById(id!).then(data => setStyle(data));
  }, [location, getStyleById])

  
  if (!style) return <h2>Style non trouvé</h2>

  return (
    <aside className='py-6 px-20 border-l w-1/3'>

      <h3 className='font-bold text-xl mb-6'>{style.name}</h3>

      <div className='py-6 mb-4 flex flex-col'>
        <TableOne item={style} />
      </div>

      <BackBtn to="/song/style" label="Style" />

      <button
        className="p-3 mt-8 bg-red-700 rounded-lg text-white hover:bg-red-800"
        onClick={handleDelete}
      >
        Supprimer
      </button>

    </aside>
  )
}

export default StyleSinglePage