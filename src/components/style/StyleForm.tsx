import { useNavigate } from "react-router-dom"
import { useEffect, useState, type FormEvent } from "react";

import { useStyles } from "../../hooks/songs/styleHooks";
import type { IStyle } from "../../types/song.type";

import BackBtn from "../backBtn/backBtn";


function StyleForm({ id }: { id: string | undefined }) {

  const navigate = useNavigate();
  const { createStyle, updateStyle, getStyleById } = useStyles();

  // @ts-expect-error Id is not included
  const [style, setStyle] = useState<IStyle>({});
  
  useEffect(() => {
    if (id) getStyleById(id).then(style => setStyle(style));
  }, [])

  async function handleSubmit(e : FormEvent<HTMLFormElement>) {
    e.preventDefault(); // youpi

    if (style?.name === undefined) return;
    
    const data = {
      name: style?.name
    }

    try {
      // Create
      if (!id) {
        const result = await createStyle(data);
        if (result) id = result.id;
      }

      // Update
      if (id) await updateStyle(id, data);

      // Go to the newly created/updated entry
      navigate(`/song/style/${id}`);
      
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h3 className='font-bold text-xl mb-10'>{style.name}</h3>
      <form className="p-4 flex flex-col" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setStyle({ ...style, name: e.target.value })}
          className="border-2 p-2 border-gray-200"
          value={style.name}
          placeholder="Name..."
        />
        <button className="cursor-pointer mt-6 rounded-lg p-2 text-white bg-teal-500 hover:bg-teal-600" type="submit">
          OK
        </button>

        {/* Abandon */}
        <div className="mt-4">

          {id && <BackBtn to={`/song/style/${id}`} label="Style" />}

          {!id && <BackBtn to="/song/style" label="Style" />}
        </div>

      </form>
    </div>
  )
}

export default StyleForm