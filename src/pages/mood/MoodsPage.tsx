import BackBtn from "../../components/backBtn/backBtn"
import TableMany from "../../components/tableMany/TableMany"
import type { IMood } from "../../types/song.type";
import CreateBtn from "../../components/createBtn/CreateBtn";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useMoods } from "../../hooks/songs/moodHooks";


function MoodsPage() {

  const location = useLocation();
  const { getMoods } = useMoods();
  const [moods, setMoods] = useState<IMood[]>([])

  useEffect(() => {
    getMoods().then(moods => setMoods(moods));
  }, [location])

  // if (moods.length === 0) return <h2>Aucun mood trouvé</h2>

  return (
    < main className='py-6 px-20 w-1/3' >

      <h3 className='font-bold text-xl mb-6'>Moods</h3>

      <div className="w-1/2 mb-5">
        <BackBtn to="/song" label="Song" />
      </div>

      <CreateBtn link="/song/mood/add" />

      {moods.length > 0 && <TableMany type="song/mood" list={moods} />}
    </main>
  )
}

export default MoodsPage