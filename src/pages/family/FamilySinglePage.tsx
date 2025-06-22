import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom";

import type { IFamily } from "../../types/instrument.type"
import { useFamilies } from "../../hooks/instruments/familyHooks";

import TableOne from "../../components/tableMany/TableOne";
import BackBtn from "../../components/backBtn/backBtn";

function FamilySinglePage() {

  const [family, setFamily] = useState<IFamily>();
  const { id } = useParams();
  const location = useLocation();

  const { getFamilyById, deleteFamily } = useFamilies();

  const navigate = useNavigate();

  async function handleDelete() {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm("Voulez-vous vraiment supprimer ce family ?")) return;
    await deleteFamily(id!);
    navigate("/instrument/family");
  }

  useEffect(() => {
    getFamilyById(id!).then(data => setFamily(data));
  }, [location])

  
  if (!family) return <h2>Family non trouvé</h2>

  return (
    <aside className='py-6 px-20 border-l w-1/3'>

      <h3 className='font-bold text-xl mb-6'>{family.name}</h3>

      <div className='py-6 mb-4 flex flex-col'>
        <TableOne item={family} />
      </div>

      <BackBtn to="/instrument/family" label="Family" />

      <button
        className="p-3 mt-8 bg-red-700 rounded-lg text-white hover:bg-red-800"
        onClick={handleDelete}
      >
        Supprimer
      </button>

    </aside>
  )
}

export default FamilySinglePage