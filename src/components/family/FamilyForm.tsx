import { useNavigate } from "react-router-dom"
import { useEffect, useState, type FormEvent } from "react";

import { useFamilies } from "../../hooks/instruments/familyHooks";
import type { IFamily } from "../../types/instrument.type";

import BackBtn from "../backBtn/backBtn";

function FamilyForm({ id }: { id: string | undefined }) {

  const navigate = useNavigate();
  const { createFamily, updateFamily, getFamilyById } = useFamilies();

  // @ts-expect-error : Id is not included
  const [family, setFamily] = useState<IFamily>({});

  useEffect(() => {
    if (id) getFamilyById(id).then(family => setFamily(family));
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // youpi

    if (family?.name === undefined) return;
    
    const data = {
      name: family?.name
    }

    try {
      // Create
      if (!id) {
        const result = await createFamily(data);
        if (result) id = result.id;
      }

      // Update
      if (id)
        await updateFamily(id, data);

      // Go to the newly created/updated entry
      navigate(`/instrument/family/${id}`);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h3 className='font-bold text-xl mb-10'>{family.name}</h3>
      <form className="p-4 flex flex-col" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setFamily({ ...family, name: e.target.value })}
          className="border-2 p-2 border-gray-200"
          value={family.name}
          placeholder="Name..."
        />
        <button className="cursor-pointer mt-6 rounded-lg p-2 text-white bg-teal-500 hover:bg-teal-600" type="submit">
          OK
        </button>

        {/* Abandon */}
        <div className="mt-4">

          {id && <BackBtn to={`/instrument/family/${id}`} label="Family" />}

          {!id && <BackBtn to="/instrument/family" label="Family" />}
        </div>

      </form>
    </div>
  )
}

export default FamilyForm