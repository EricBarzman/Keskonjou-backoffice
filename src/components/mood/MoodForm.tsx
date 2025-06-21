import { useNavigate } from "react-router-dom"
import { useMoods } from "../../hooks/songs/moodHooks";
import { useEffect, useState, type FormEvent } from "react";
import type { IMood } from "../../types/song.type";
import BackBtn from "../backBtn/backBtn";

function MoodForm({ id }: { id: string | undefined }) {

  const navigate = useNavigate();
  const { createMood, updateMood, getMoodById } = useMoods();

  // @ts-expect-error Id is not included
  const [mood, setMood] = useState<IMood>({});

  useEffect(() => {
    if (id) getMoodById(id).then(mood => setMood(mood));
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // youpi

    if (mood?.name === undefined) return;
    
    const data = {
      name: mood?.name
    }

    try {
      // Create
      if (!id) {
        const result = await createMood(data);
        if (result) id = result.id;
      }

      // Update
      if (id)
        await updateMood(id, data);

      // Go to the newly created/updated entry
      navigate(`/song/mood/${id}`);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h3 className='font-bold text-xl mb-10'>{mood.name}</h3>
      <form className="p-4 flex flex-col" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setMood({ ...mood, name: e.target.value })}
          className="border-2 p-2 border-gray-200"
          value={mood.name}
          placeholder="Name..."
        />
        <button className="cursor-pointer mt-6 rounded-lg p-2 text-white bg-teal-500 hover:bg-teal-600" type="submit">
          OK
        </button>

        {/* Abandon */}
        <div className="mt-4">

          {id && <BackBtn to={`/song/mood/${id}`} label="Mood" />}

          {!id && <BackBtn to="/song/mood" label="Mood" />}
        </div>

      </form>
    </div>
  )
}

export default MoodForm