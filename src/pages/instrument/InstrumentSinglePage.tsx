import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom";

import type { IInstrumentNested } from "../../types/instrument.type"
import { useInstruments } from "../../hooks/instruments/instrumentHooks";

import BackBtn from "../../components/backBtn/backBtn";
import InstrumentTableOne from "../../components/instrument/InstrumentTableOne";


function InstrumentSinglePage() {

  const [instrument, setInstrument] = useState<IInstrumentNested>();
  const { id } = useParams();
  const location = useLocation();

  const { getInstrumentById, deleteInstrument } = useInstruments();

  const navigate = useNavigate();

  async function handleDelete() {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm("Voulez-vous vraiment supprimer cet instrument ?")) return;
    await deleteInstrument(id!);
    navigate("/instrument/instrument");
  }

  useEffect(() => {
    getInstrumentById(id!).then(data => setInstrument(data));
  }, [location])
  
  if (!instrument) return <h2>Instrument non trouvé</h2>

  return (
    <aside className='py-6 px-20 border-l w-1/3'>

      <h3 className='font-bold text-xl mb-6'>{instrument.name}</h3>

      <div className='py-6 mb-4 flex flex-col'>
        <InstrumentTableOne instrument={instrument} />
      </div>

      <BackBtn to="/instrument/instrument" label="Instrument" />

      <button
        className="p-3 mt-8 bg-red-700 rounded-lg text-white hover:bg-red-800"
        onClick={handleDelete}
      >
        Supprimer
      </button>

    </aside>
  )
}

export default InstrumentSinglePage