import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState, type FormEvent } from "react";

import type { IMood, ISong, IStyle } from "../../types/song.type";
import { useSongs } from "../../hooks/songs/songHooks";

import BackBtn from "../../components/backBtn/backBtn";
import { useStyles } from "../../hooks/songs/styleHooks";
import { useMoods } from "../../hooks/songs/moodHooks";
import { useInstruments } from "../../hooks/instruments/instrumentHooks";
import type { IInstrument } from "../../types/instrument.type";

function SongCreateOrEdit() {

  let { id } = useParams();

  const navigate = useNavigate();
  const { createSong, updateSong, getSongById } = useSongs();

  const { getStyles } = useStyles();
  const { getMoods } = useMoods();
  const { getInstruments } = useInstruments();

  const [song, setSong] = useState<ISong>({
    id: "",
    title : "",
    duration: 0,
    instrumentsNotRequired: [],
    hasSolo: false,
    partitionPath: "",
  });

  const [styles, setStyles] = useState<IStyle[]>([]);
  const [moods, setMoods] = useState<IMood[]>([]);
  const [instruments, setInstruments] = useState<IInstrument[]>([]);

  useEffect(() => {
    if (id) getSongById(id).then(song => setSong(song));
    getMoods().then(it => setMoods(it));
    getStyles().then(it => setStyles(it));
    getInstruments().then(it => setInstruments(it));
  }, [])


  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // youpi

    if (song?.title === undefined) {
      alert("Veuillez remplir un titre");
      return
    };

    const data = {
      title: song.title,
      duration: song.duration,
      styleId: song.styleId,
      instrumentsNotRequired: song.instrumentsNotRequired,
      hasSolo: song.hasSolo,
      partitionPath: song.partitionPath,
    }

    try {
      // Create
      if (!id) {
        const result = await createSong(data);
        if (result) id = result.id;
      }

      // Update
      if (id)
        await updateSong(id, data);

      // Go to the newly created/updated entry
      navigate(`/song/song/${id}`);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <aside className='py-6 px-20 border-l w-1/3'>
      <div>
        <h3 className='font-bold text-xl mb-10'>{song.name}</h3>
        <form className="p-4 flex flex-col" onSubmit={handleSubmit}>

          <label className="mt-4 mb-2 text-sm font-semibold">Title</label>
          <input
            type="text"
            onChange={(e) => setSong({ ...song, title: e.target.value })}
            className="border-2 p-2 border-gray-200"
            defaultValue={undefined}
            value={song.title}
            placeholder="Title..."
          />

          <label className="mt-4 mb-2 text-sm font-semibold">Duration (in seconds)</label>
          <input
            type="number"
            onChange={(e) => setSong({ ...song, duration: parseInt(e.target.value) })}
            className="border-2 p-2 border-gray-200"
            value={song.duration}
            placeholder="Duration (in seconds)..."
          />

          <label className="mt-4 mb-2 text-sm font-semibold">Mood</label>
          <select
            onChange={(e) => setSong({ ...song, moodId: e.currentTarget.value })}
            className="border-2 p-2 border-gray-200"
            value={song.moodId}
          >
            <option value="">Choisir un mood</option>
            {moods.map(mood => (
              <option key={mood.id} value={mood.id}>{mood.name}</option>
            ))}
          </select>

          <label className="mt-4 mb-2 text-sm font-semibold">Style</label>
          <select
            onChange={(e) => setSong({ ...song, styleId: e.currentTarget.value })}
            className="border-2 p-2 border-gray-200"
            value={song.styleId}
          >
            <option value="">Choisir un style</option>
            {styles.map((style) => (
              <option key={style.id} value={style.id}>{style.name}</option>
            ))}
          </select>

          <label className="mt-4 mb-2 text-sm font-semibold">Instruments NOT required</label>
          <div className="grid grid-cols-2 gap-2">
            {instruments.map(instrument =>
              <div key={instrument.id}>
                <label className="mt-4">{instrument.name}</label>
                <input
                  type="checkbox"
                  onChange={(e) => setSong({ ...song, instrumentsNotRequired: [...song.instrumentsNotRequired!, e.target.value] })}
                  className="w-[10] h-[10]"
                  value={instrument.id}
                  placeholder="Duration (in seconds)..."
                />
              </div>
            )}
          </div>

          <label className="mt-4 mb-2 text-sm font-semibold">Is there a solo?</label>
          <input
            type="checkbox"
            className="border-2 p-2 border-gray-200"
            onClick={() => setSong({ ...song, hasSolo: !song.hasSolo})}
          />
          
          <button className="cursor-pointer mt-6 rounded-lg p-2 text-white bg-teal-500 hover:bg-teal-600" type="submit">
            OK
          </button>

          {/* Abandon */}
          <div className="mt-4">

            {id && <BackBtn to={`/song/song/${id}`} label="Song" />}

            {!id && <BackBtn to="/song/song" label="Song" />}
          </div>

        </form>
      </div>
    </aside >
  )
}

export default SongCreateOrEdit