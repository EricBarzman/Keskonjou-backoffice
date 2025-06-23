import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import { useGigs } from "../../hooks/gigs/gigHooks";
import type { IGigNested } from "../../types/gig.type"

import BackBtn from "../../components/backBtn/backBtn";

function GigSinglePage() {

  const [gig, setGig] = useState<IGigNested>();
  const { id } = useParams();
  const location = useLocation();

  const { getGigByIdNested, deleteGig } = useGigs();

  const navigate = useNavigate();

  async function handleDelete() {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm("Voulez-vous vraiment supprimer ce gig ?")) return;
    await deleteGig(id!);
    navigate("/gig/gig");
  }

  useEffect(() => {
    getGigByIdNested(id!).then(data => setGig(data));
  }, [location])

  if (!gig) return <h2>Gig non trouvé</h2>

  return (
    <aside className='py-6 px-20 border-l w-1/3'>

      <h3 className='font-bold text-xl mb-6'>{gig.title}</h3>

      {/* Table One */}
      <div className='py-6 mb-4 flex flex-col'>
        <table className="border-collapse text-left">
          <thead>
            <tr>
              <th className="border capitalize border-gray-500 p-3">Title</th>
              <th className="border capitalize border-gray-500 p-3">Place</th>
              <th className="border capitalize border-gray-500 p-3">Date</th>
              <th className="border capitalize border-gray-500 p-3">Bands</th>
              <th className="border capitalize border-gray-500 p-3">Costumes</th>
              <th className="border capitalize border-gray-500 p-3">Setlists</th>
              
              <th className="border border-gray-500 p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr >

              <td className="border border-gray-500 p-3">
                {gig.title}
              </td>

              <td className="border border-gray-500 p-3">
                {gig.place}
              </td>

              <td className="border border-gray-500 p-3">
                {/* {new Date(gig.date.seconds).getUTCDate()} */}
              </td>

              <td className="border border-gray-500 p-3">
                {gig.bands?.length === 0
                  ? "-"
                  : gig.bands!.map(band => band.name).join(", ")}
              </td>
              
              <td className="border border-gray-500 p-3">
                {gig.costumes?.length === 0
                  ? "-"
                  : gig.costumes!.map(costume => costume.name).join(", ")}
              </td>

              <td className="border border-gray-500 p-3">
                {gig.setlists?.length === 0
                  ? "-"
                  : gig.setlists!.map(setlist => setlist.title).join(", ")}
              </td>
            
              
              <td className="border border-gray-500 p-3 hover:bg-teal-100">
                <Link to={`edit`}>Editer</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <BackBtn to="/gig/gig" label="Gig" />

      <button
        className="p-3 mt-8 bg-red-700 rounded-lg text-white hover:bg-red-800"
        onClick={handleDelete}
      >
        Supprimer
      </button>

    </aside>
  )
}

export default GigSinglePage