import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useFamilies } from "../../hooks/instruments/familyHooks";
import type { IFamily } from "../../types/instrument.type";

import BackBtn from "../../components/backBtn/backBtn"
import CreateBtn from "../../components/createBtn/CreateBtn";
import TableMany from "../../components/tableMany/TableMany"


function FamiliesPage() {

  const location = useLocation();
  const { getFamilies } = useFamilies();
  const [families, setFamilies] = useState<IFamily[]>([])

  useEffect(() => {
    getFamilies().then(families => setFamilies(families));
  }, [location])

  // if (families.length === 0) return <h2>Aucun famille trouvé</h2>

  return (
    < main className='py-6 px-20 w-1/3' >

      <h3 className='font-bold text-xl mb-6'>Families</h3>

      <div className="w-1/2 mb-5">
        <BackBtn to="/instrument" label="Instrument" />
      </div>

      <CreateBtn link="/instrument/family/add" />

      {families.length > 0 && <TableMany type="instrument/family" list={families} />}
    </main>
  )
}

export default FamiliesPage