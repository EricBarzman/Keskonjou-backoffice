import { useEffect, useState, type FormEvent } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom"

import { useBands } from "../../hooks/people/bandHooks";
import { useMusicians } from "../../hooks/people/musicianHooks";
import type { IBand, IMusician } from "../../types/people.type";

import BackBtn from "../../components/backBtn/backBtn";


const emptyBand : IBand = {
  id: "",
  name: "",
  musicians: []
}

function BandCreateOrEdit() {

  let { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { createBand, updateBand, getBandById } = useBands();
  const { getMusicians } = useMusicians();

  const [band, setBand] = useState<IBand>(emptyBand);
  const [musicians, setMusicians] = useState<IMusician[]>([]);

  useEffect(() => {
    if (id) getBandById(id).then(band => setBand(band));
    getMusicians().then(it => setMusicians(it));
  }, [])

  // Reset everything (specially if user click "create" button)
  useEffect(() => {
    setBand(emptyBand);
  }, [location])


  function handleMusicians(e: FormEvent<HTMLInputElement>) {
    if (e.currentTarget.checked)
      setBand({ ...band, musicians: [...band.musicians!, e.currentTarget.value] })
    
    if (!e.currentTarget.checked)
      setBand({ ...band, musicians: band.musicians.filter(mus => mus !== e.currentTarget.value)})
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // youpi

    if (band?.name === "") {
      alert("Veuillez remplir un nom");
      return
    };

    const data = {
      name: band?.name,
      musicians: band?.musicians,
    }

    try {
      // Create
      if (!id) {
        const result = await createBand(data);
        if (result) id = result.id;
      }

      // Update
      if (id)
        await updateBand(id, data);

      // Go to the newly created/updated entry
      navigate(`/people/band/${id}`);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <aside className='py-6 px-20 border-l w-1/2 '>
      <div>
        
        <h3 className='font-bold text-xl mb-10'>{band?.name}</h3>

        <form className="p-4 flex flex-col" onSubmit={handleSubmit}>
          <label className="mt-4 mb-2 text-sm font-semibold">Name</label>
          <input
            type="text"
            onChange={(e) => setBand({ ...band, name: e.target.value })}
            className="border-2 p-2 border-gray-200"
            value={band.name}
            placeholder="Name..."
          />

          <label className="mt-4 mb-2 text-sm font-semibold">Musicians</label>
          <div className="grid grid-cols-3 gap-2">
            {musicians.map(musician =>
              <div key={musician.id}>
                <label className="mt-4 mr-2">{musician.firstname} {musician.lastname}</label>
                <input
                  type="checkbox"
                  defaultChecked={band.musicians.includes(musician.id)}
                  onChange={handleMusicians}
                  className="w-[10] h-[10]"
                  value={musician.id}
                />
              </div>
            )}
          </div>

          <button className="cursor-pointer mt-6 rounded-lg mx-auto p-2 w-1/2 text-white bg-teal-500 hover:bg-teal-600" type="submit">
            OK
          </button>

          {/* Abandon */}
          <div className="mt-4 w-1/2 mx-auto">

            {id && <BackBtn to={`/people/band/${id}`} label="Band" />}

            {!id && <BackBtn to="/people/band" label="Band" />}
          </div>

        </form>
      </div>
    </aside >
  )
}

export default BandCreateOrEdit