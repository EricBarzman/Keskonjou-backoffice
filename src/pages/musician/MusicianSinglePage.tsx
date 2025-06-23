import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import type { IMusicianNested } from "../../types/people.type"
import { useMusicians } from "../../hooks/people/musicianHooks";

import BackBtn from "../../components/backBtn/backBtn";

function MusicianSinglePage() {

  const [musician, setMusician] = useState<IMusicianNested>();
  const { id } = useParams();
  const location = useLocation();

  const { getMusicianByIdNested, deleteMusician } = useMusicians();

  const navigate = useNavigate();

  async function handleDelete() {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm("Voulez-vous vraiment supprimer ce musician ?")) return;
    await deleteMusician(id!);
    navigate("/people/musician");
  }

  useEffect(() => {
    getMusicianByIdNested(id!).then(data => setMusician(data));
  }, [location])


  if (!musician) return <h2>Musician non trouvé</h2>

  return (
    <aside className='py-6 px-20 border-l w-1/3'>

      <h3 className='font-bold text-xl mb-6'>{musician.name}</h3>

      <div className='py-6 mb-4 flex flex-col'>
        {/* Table One */}
        <div className='py-6 mb-4 flex flex-col'>
          <table className="border-collapse text-left">
            <thead>
              <tr>
                <th className="border capitalize border-gray-500 p-3">First name</th>
                <th className="border capitalize border-gray-500 p-3">Last name</th>
                <th className="border capitalize border-gray-500 p-3">Instruments</th>
                <th className="border border-gray-500 p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr >
                <td className="border border-gray-500 p-3">{musician.firstname}</td>
                <td className="border border-gray-500 p-3">{musician.lastname}</td>
                <td className="border border-gray-500 p-3">
                  {musician.instruments.map(i => i.name).join(", ")}
                </td>
                <td className="border border-gray-500 p-3 hover:bg-teal-100">
                  <Link to={`edit`}>Editer</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <BackBtn to="/people/musician" label="Musician" />

      <button
        className="p-3 mt-8 bg-red-700 rounded-lg text-white hover:bg-red-800"
        onClick={handleDelete}
      >
        Supprimer
      </button>

    </aside>
  )
}

export default MusicianSinglePage