import { useEffect, useState } from "react"
import type { ICostume } from "../../types/gig.type"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCostumes } from "../../hooks/gigs/costumeHooks";
import TableOne from "../../components/tableMany/TableOne";
import BackBtn from "../../components/backBtn/backBtn";

function CostumeSinglePage() {

  const [costume, setCostume] = useState<ICostume>();
  const { id } = useParams();
  const location = useLocation();

  const { getCostumeById, deleteCostume } = useCostumes();

  const navigate = useNavigate();

  async function handleDelete() {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm("Voulez-vous vraiment supprimer ce costume ?")) return;
    await deleteCostume(id!);
    navigate("/gig/costume");
  }

  useEffect(() => {
    getCostumeById(id!).then(data => setCostume(data));
  }, [location])

  
  if (!costume) return <h2>Costume non trouvé</h2>

  return (
    <aside className='py-6 px-20 border-l w-1/3'>

      <h3 className='font-bold text-xl mb-6'>{costume.name}</h3>

      <div className='py-6 mb-4 flex flex-col'>
        <TableOne item={costume} />
      </div>

      <BackBtn to="/gig/costume" label="Costume" />

      <button
        className="p-3 mt-8 bg-red-700 rounded-lg text-white hover:bg-red-800"
        onClick={handleDelete}
      >
        Supprimer
      </button>

    </aside>
  )
}

export default CostumeSinglePage