import BackBtn from "../../components/backBtn/backBtn"
import TableMany from "../../components/tableMany/TableMany"
import type { ICostume } from "../../types/gig.type";
import CreateBtn from "../../components/createBtn/CreateBtn";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useCostumes } from "../../hooks/gigs/costumeHooks";


function CostumesPage() {

  const location = useLocation();
  const { getCostumes } = useCostumes();
  const [costumes, setCostumes] = useState<ICostume[]>([])

  useEffect(() => {
    getCostumes().then(costumes => setCostumes(costumes));
  }, [location])

  // if (costumes.length === 0) return <h2>Aucun costume trouvé</h2>

  return (
    < main className='py-6 px-20 w-1/3' >

      <h3 className='font-bold text-xl mb-6'>Costumes</h3>

      <div className="w-1/2 mb-5">
        <BackBtn to="/gig" label="Gig" />
      </div>

      <CreateBtn link="/gig/costume/add" />

      {costumes.length > 0 && <TableMany type="gig/costume" list={costumes} />}
    </main>
  )
}

export default CostumesPage