import { useNavigate } from "react-router-dom"
import { useEffect, useState, type FormEvent } from "react";

import { useCostumes } from "../../hooks/gigs/costumeHooks";
import type { ICostume } from "../../types/gig.type";

import BackBtn from "../backBtn/backBtn";

function CostumeForm({ id }: { id: string | undefined }) {

  const navigate = useNavigate();
  const { createCostume, updateCostume, getCostumeById } = useCostumes();

  // @ts-expect-error : Id is not included
  const [costume, setCostume] = useState<ICostume>({});

  useEffect(() => {
    if (id) getCostumeById(id).then(costume => setCostume(costume));
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // youpi

    if (costume?.name === undefined) return;
    
    const data = {
      name: costume?.name
    }

    try {
      // Create
      if (!id) {
        const result = await createCostume(data);
        if (result) id = result.id;
      }

      // Update
      if (id)
        await updateCostume(id, data);

      // Go to the newly created/updated entry
      navigate(`/gig/costume/${id}`);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h3 className='font-bold text-xl mb-10'>{costume.name}</h3>
      <form className="p-4 flex flex-col" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setCostume({ ...costume, name: e.target.value })}
          className="border-2 p-2 border-gray-200"
          value={costume.name}
          placeholder="Name..."
        />
        <button className="cursor-pointer mt-6 rounded-lg p-2 text-white bg-teal-500 hover:bg-teal-600" type="submit">
          OK
        </button>

        {/* Abandon */}
        <div className="mt-4">

          {id && <BackBtn to={`/gig/costume/${id}`} label="Costume" />}

          {!id && <BackBtn to="/gig/costume" label="Costume" />}
        </div>

      </form>
    </div>
  )
}

export default CostumeForm