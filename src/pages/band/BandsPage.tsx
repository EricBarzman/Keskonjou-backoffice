import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useBands } from "../../hooks/people/bandHooks";
import type { IBand } from "../../types/people.type";

import CreateBtn from "../../components/createBtn/CreateBtn";
import BackBtn from "../../components/backBtn/backBtn"


function BandsPage() {

  const location = useLocation();
  const { getBands } = useBands();
  const [bands, setBands] = useState<IBand[]>([])

  useEffect(() => {
    getBands().then(bands => setBands(bands));
  }, [location])

  // if (bands.length === 0) return <h2>Aucun band trouvé</h2>

  return (
    < main className='py-6 px-20 w-1/3' >

      <h3 className='font-bold text-xl mb-6'>Bands</h3>

      <div className="w-1/2 mb-5">
        <BackBtn to="/people" label="People" />
      </div>

      <CreateBtn link="/people/band/add" />

      {bands.length > 0 && (
        < div className='py-6'>
          <table className="border-collapse text-left">
            <thead>
              <tr>
                <th className="border border-gray-500 p-3">Index</th>
                <th className="border capitalize border-gray-500 p-3">Name</th>
                <th className="border border-gray-500 p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {bands.map((band, index) => (
                <tr key={index}>
                  <td className="border border-gray-500 p-3">{index + 1}</td>
                  <td className="border border-gray-500 p-3">{band.name}</td>
                  <td className="border border-gray-500 p-3 hover:bg-amber-300">
                    <Link to={`/people/band/${band.id}`}>Voir</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </main >
  )
}

export default BandsPage