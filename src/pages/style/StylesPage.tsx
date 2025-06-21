import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import type { IStyle } from "../../types/song.type";

import { useStyles } from "../../hooks/songs/styleHooks";

import BackBtn from "../../components/backBtn/backBtn"
import TableMany from "../../components/tableMany/TableMany"
import CreateBtn from "../../components/createBtn/CreateBtn";


function StylesPage() {

  const location = useLocation();
  const { getStyles } = useStyles();
  const [styles, setStyles] = useState<IStyle[]>([])

  useEffect(() => {
    getStyles().then(styles => setStyles(styles));
  }, [location])

  // if (styles.length === 0) return <h2>Aucun style trouvé</h2>

  return (
    < main className='py-6 px-20 w-1/3' >

      <h3 className='font-bold text-xl mb-6'>Styles</h3>

      <div className="w-1/2 mb-5">
        <BackBtn to="/song" label="Song" />
      </div>

      <CreateBtn link="/song/style/add" />

      {styles.length > 0 && <TableMany type="song/style" list={styles} />}
    </main>
  )
}

export default StylesPage