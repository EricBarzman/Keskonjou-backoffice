import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useGigs } from "../../hooks/gigs/gigHooks";
import type { IGig } from "../../types/gig.type";

import CreateBtn from "../../components/createBtn/CreateBtn";
import BackBtn from "../../components/backBtn/backBtn"


function GigsPage() {

  const location = useLocation();
  const { getGigs } = useGigs();
  const [gigs, setGigs] = useState<IGig[]>([])

  useEffect(() => {
    getGigs().then(gigs => setGigs(gigs));
  }, [location])

  // if (gigs.length === 0) return <h2>Aucun gig trouvé</h2>

  return (
    < main className='py-6 px-20 w-1/3' >

      <h3 className='font-bold text-xl mb-6'>Gigs</h3>

      <div className="w-1/2 mb-5">
        <BackBtn to="/gig" label="Gig catégories" />
      </div>

      <CreateBtn link="/gig/gig/add" />

      {/* Table liste */}
      {gigs.length > 0 && (
        <div className='py-6'>
          <table className="border-collapse text-left">
            <thead>
              <tr>
                <th className="border border-gray-500 p-3">Index</th>
                <th className="border capitalize border-gray-500 p-3">Title</th>
                <th className="border capitalize border-gray-500 p-3">Place</th>
                <th className="border border-gray-500 p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {gigs.map((gig, index) => (
                <tr key={gig.id}>
                  <td className="border border-gray-500 p-3">{index + 1}</td>
                  <td className="border border-gray-500 p-3">{gig.title}</td>
                  <td className="border border-gray-500 p-3">{gig.place}</td>
                  <td className="border border-gray-500 p-3 hover:bg-amber-300">
                    <Link to={`/gig/gig/${gig.id}`}>Voir</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}

export default GigsPage