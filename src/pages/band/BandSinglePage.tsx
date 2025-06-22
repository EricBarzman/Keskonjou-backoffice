import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import type { IBandNested } from "../../types/people.type"
import { useBands } from "../../hooks/people/bandHooks";

import BackBtn from "../../components/backBtn/backBtn";

function BandSinglePage() {

  const [band, setBand] = useState<IBandNested>();
  const { id } = useParams();
  const location = useLocation();

  const { getBandByIdNested, deleteBand } = useBands();

  const navigate = useNavigate();

  async function handleDelete() {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm("Voulez-vous vraiment supprimer ce band ?")) return;
    await deleteBand(id!);
    navigate("/people/band");
  }

  useEffect(() => {
    getBandByIdNested(id!).then(data => setBand(data));
  }, [location])


  if (!band) return <h2>Band non trouvé</h2>

  return (
    <aside className='py-6 px-20 border-l w-1/3'>

      <h3 className='font-bold text-xl mb-6'>{band.name}</h3>

      <div className='py-6 mb-4 flex flex-col'>
        {/* Table One */}
        <div className='py-6 mb-4 flex flex-col'>
          <table className="border-collapse text-left">
            <thead>
              <tr>
                <th className="border capitalize border-gray-500 p-3">Name</th>
                <th className="border capitalize border-gray-500 p-3">Musicians</th>
                <th className="border border-gray-500 p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr >
                <td className="border border-gray-500 p-3">{band.name}</td>
                <td className="border border-gray-500 p-3">
                  {band.musicians.map(musician => musician.firstname + " " + musician.lastname).join(", ")}
                </td>
                <td className="border border-gray-500 p-3 hover:bg-teal-100">
                  <Link to={`edit`}>Editer</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <BackBtn to="/people/band" label="Band" />

      <button
        className="p-3 mt-8 bg-red-700 rounded-lg text-white hover:bg-red-800"
        onClick={handleDelete}
      >
        Supprimer
      </button>

    </aside>
  )
}

export default BandSinglePage