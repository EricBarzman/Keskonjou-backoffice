import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useMusicians } from "../../hooks/people/musicianHooks";
import type { IMusician } from "../../types/people.type";

import CreateBtn from "../../components/createBtn/CreateBtn";
import BackBtn from "../../components/backBtn/backBtn"


function MusiciansPage() {

  const location = useLocation();
  const { getMusicians } = useMusicians();
  const [musicians, setMusicians] = useState<IMusician[]>([])

  useEffect(() => {
    getMusicians().then(musicians => setMusicians(musicians));
  }, [location])

  // if (musicians.length === 0) return <h2>Aucun musician trouvé</h2>

  return (
    < main className='py-6 px-20 w-1/3' >

      <h3 className='font-bold text-xl mb-6'>Musicians</h3>

      <div className="w-1/2 mb-5">
        <BackBtn to="/people" label="People" />
      </div>

      <CreateBtn link="/people/musician/add" />

      {musicians.length > 0 && (
        < div className='py-6'>
          <table className="border-collapse text-left">
            <thead>
              <tr>
                <th className="border border-gray-500 p-3">Index</th>
                <th className="border capitalize border-gray-500 p-3">First Name</th>
                <th className="border capitalize border-gray-500 p-3">Last Name</th>
                <th className="border border-gray-500 p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {musicians.map((musician, index) => (
                <tr key={index}>
                  <td className="border border-gray-500 p-3">{index + 1}</td>
                  <td className="border border-gray-500 p-3">{musician.firstname}</td>
                  <td className="border border-gray-500 p-3">{musician.lastname}</td>
                  <td className="border border-gray-500 p-3 hover:bg-amber-300">
                    <Link to={`/people/musician/${musician.id}`}>Voir</Link>
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

export default MusiciansPage