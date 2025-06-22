import { useNavigate } from "react-router-dom"
import { useEffect, useState, type FormEvent } from "react";

import { useInstruments } from "../../hooks/instruments/instrumentHooks";
import type { IFamily, IInstrumentNested } from "../../types/instrument.type";

import BackBtn from "../backBtn/backBtn";
import { useFamilies } from "../../hooks/instruments/familyHooks";


function InstrumentForm({ id }: { id: string | undefined }) {

  const navigate = useNavigate();
  const { createInstrument, updateInstrument, getInstrumentById } = useInstruments();
  const { getFamilies } = useFamilies();

  // @ts-expect-error : Id is not included
  const [instrument, setInstrument] = useState<IInstrumentNested>({});
  const [families, setFamilies] = useState<IFamily[]>([]);

  useEffect(() => {
    if (id) getInstrumentById(id).then(instrument => setInstrument(instrument));
    getFamilies().then(families => setFamilies(families));
  }, [])


  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // youpi

    if (instrument?.name === undefined) return;
    if (instrument?.familyId === undefined) {
      alert("Veuillez choisir une famille");
      return
    };
    
    const data = {
      name: instrument?.name,
      familyId: instrument?.familyId,
    }

    try {
      // Create
      if (!id) {
        const result = await createInstrument(data);
        if (result) id = result.id;
      }

      // Update
      if (id)
        await updateInstrument(id, data);

      // Go to the newly created/updated entry
      navigate(`/instrument/instrument/${id}`);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h3 className='font-bold text-xl mb-10'>{instrument.name}</h3>
      <form className="p-4 flex flex-col" onSubmit={handleSubmit}>
        
        <input
          type="text"
          onChange={(e) => setInstrument({ ...instrument, name: e.target.value })}
          className="border-2 p-2 border-gray-200"
          defaultValue={undefined}
          value={instrument.name}
          placeholder="Name..."
        />

        <label className="mt-4 mb-2 text-sm font-semibold">Famille d'instrument</label>
        <select
          onChange={(e) => setInstrument({ ...instrument, familyId: e.currentTarget.value })}
          className="border-2 p-2 border-gray-200"
          value={instrument.familyId}
        >
          <option value="">Choisir une famille</option>
          {families.map(family => (
            <option value={family.id}>{family.name}</option>
          ))}
        </select>

        <button className="cursor-pointer mt-6 rounded-lg p-2 text-white bg-teal-500 hover:bg-teal-600" type="submit">
          OK
        </button>

        {/* Abandon */}
        <div className="mt-4">

          {id && <BackBtn to={`/instrument/instrument/${id}`} label="Instrument" />}

          {!id && <BackBtn to="/instrument/instrument" label="Instrument" />}
        </div>

      </form>
    </div>
  )
}

export default InstrumentForm