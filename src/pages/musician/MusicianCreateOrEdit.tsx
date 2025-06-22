import { useEffect, useState, type FormEvent } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom"

import { useMusicians } from "../../hooks/people/musicianHooks";
import { useInstruments } from "../../hooks/instruments/instrumentHooks";
import type { IMusician } from "../../types/people.type";
import type { IInstrument } from "../../types/instrument.type";
import BackBtn from "../../components/backBtn/backBtn";


const emptyMusician : IMusician = {
  id:"",
  firstname: "",
  lastname: "",
  instruments: []
}

function MusicianCreateOrEdit() {

  let { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { createMusician, updateMusician, getMusicianById } = useMusicians();
  const { getInstruments } = useInstruments();

  const [musician, setMusician] = useState<IMusician>(emptyMusician);
  const [instruments, setInstruments] = useState<IInstrument[]>([]);

  useEffect(() => {
    if (id) getMusicianById(id).then(musician => setMusician(musician));
    getInstruments().then(it => setInstruments(it));
  }, [])

  // Reset everything (specially if user click "create" button)
  useEffect(() => {
    setMusician(emptyMusician);
  }, [location])


  function handleInstruments(e: FormEvent<HTMLInputElement>) {
    if (e.currentTarget.checked)
      setMusician({ ...musician, instruments: [...musician.instruments!, e.currentTarget.value] })
    
    if (!e.currentTarget.checked)
      setMusician({ ...musician, instruments: musician.instruments.filter(ins => ins !== e.currentTarget.value)})
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // youpi

    if (musician?.lastname === "") {
      alert("Veuillez remplir un nom");
      return
    };
    if (musician?.firstname === "") {
      alert("Veuillez remplir un prénom");
      return
    };

    const data = {
      firstname: musician?.firstname,
      lastname: musician?.lastname,
      instruments: musician?.instruments
    }

    try {
      // Create
      if (!id) {
        const result = await createMusician(data);
        if (result) id = result.id;
      }

      // Update
      if (id)
        await updateMusician(id, data);

      // Go to the newly created/updated entry
      navigate(`/people/musician/${id}`);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <aside className='py-6 px-20 border-l w-1/3'>
      <div>
        
        <h3 className='font-bold text-xl mb-10'>{musician?.firstname} {musician?.lastname}</h3>

        <form className="p-4 flex flex-col" onSubmit={handleSubmit}>
          <label className="mt-4 mb-2 text-sm font-semibold">First name</label>
          <input
            type="text"
            onChange={(e) => setMusician({ ...musician, firstname: e.target.value })}
            className="border-2 p-2 border-gray-200"
            defaultValue={undefined}
            value={musician.firstname}
            placeholder="First name..."
          />

          <label className="mt-4 mb-2 text-sm font-semibold">Last name</label>
          <input
            type="text"
            onChange={(e) => setMusician({ ...musician, lastname: e.target.value })}
            className="border-2 p-2 border-gray-200"
            defaultValue={undefined}
            value={musician.lastname}
            placeholder="Last name..."
          />

          <label className="mt-4 mb-2 text-sm font-semibold">Instruments</label>
          <div className="grid grid-cols-2 gap-2">
            {instruments.map(instrument =>
              <div key={instrument.id}>
                <label className="mt-4">{instrument.name}</label>
                <input
                  type="checkbox"
                  defaultChecked={musician.instruments.includes(instrument.id)}
                  onChange={handleInstruments}
                  className="w-[10] h-[10]"
                  value={instrument.id}
                />
              </div>
            )}
          </div>

          <button className="cursor-pointer mt-6 rounded-lg p-2 text-white bg-teal-500 hover:bg-teal-600" type="submit">
            OK
          </button>

          {/* Abandon */}
          <div className="mt-4">

            {id && <BackBtn to={`/people/musician/${id}`} label="Musician" />}

            {!id && <BackBtn to="/people/musician" label="Musician" />}
          </div>

        </form>
      </div>
    </aside >
  )
}

export default MusicianCreateOrEdit