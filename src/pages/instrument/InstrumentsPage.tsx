import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useInstruments } from "../../hooks/instruments/instrumentHooks";
import type { IInstrument } from "../../types/instrument.type";

import InstrumentTableMany from "../../components/instrument/InstrumentTableMany"
import BackBtn from "../../components/backBtn/backBtn"
import CreateBtn from "../../components/createBtn/CreateBtn";


function InstrumentsPage() {

  const location = useLocation();
  const { getInstruments } = useInstruments();
  const [instruments, setInstruments] = useState<IInstrument[]>([])

  useEffect(() => {
    getInstruments().then(instruments => setInstruments(instruments));
  }, [location])

  // if (instruments.length === 0) return <h2>Aucun instrument trouvé</h2>

  return (
    < main className='py-6 px-20 w-1/3' >

      <h3 className='font-bold text-xl mb-6'>Instruments</h3>

      <div className="w-1/2 mb-5">
        <BackBtn to="/instrument" label="Instrument catégories" />
      </div>

      <CreateBtn link="/instrument/instrument/add" />

      {instruments.length > 0 && <InstrumentTableMany list={instruments} />}
    </main>
  )
}

export default InstrumentsPage