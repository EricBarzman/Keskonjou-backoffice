import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState, type FormEvent } from "react";

import type { IMood, ISong, IStyle } from "../../types/song.type";
import { useSongs } from "../../hooks/songs/songHooks";

import BackBtn from "../../components/backBtn/backBtn";
import { useStyles } from "../../hooks/songs/styleHooks";
import { useMoods } from "../../hooks/songs/moodHooks";
import { useInstruments } from "../../hooks/instruments/instrumentHooks";
import type { IInstrument } from "../../types/instrument.type";

const emptySong = {
  id: "",
  title: "",
  styleId: "",
  moodId: "",
  duration: 0,
  instrumentsNotRequired: [],
  hasSolo: false,
  partitionPath: "",
}

function SongCreateOrEdit() {

  let { id } = useParams();

  const location = useLocation();

  const navigate = useNavigate();
  const { createSong, updateSong, getSongById } = useSongs();

  const { getStyles } = useStyles();
  const { getMoods } = useMoods();
  const { getInstruments } = useInstruments();

  const [song, setSong] = useState<ISong>(emptySong);

  const [durationInMin, setDurationInMin] = useState(0);
  const [durationInSec, setDurationInSec] = useState(0);

  const [styles, setStyles] = useState<IStyle[]>([]);
  const [moods, setMoods] = useState<IMood[]>([]);
  const [instruments, setInstruments] = useState<IInstrument[]>([]);

  useEffect(() => {
    if (id) getSongById(id).then(song => {
      setSong(song);
      setDurationInMin(Math.floor(song.duration! / 60));
      setDurationInSec(Math.floor(song.duration! % 60));
    });
    getMoods().then(it => setMoods(it));
    getStyles().then(it => setStyles(it));
    getInstruments().then(it => setInstruments(it));
  }, [])

  // Reset everything (specially if user click "create" button)
  useEffect(() => {
    setSong(emptySong);
    setDurationInMin(0);
    setDurationInSec(0);
  }, [location])

  // Alter duration
  useEffect(() => {
    setSong({ ...song, duration: (durationInMin * 60) + durationInSec })
  }, [durationInMin, durationInSec])

  function handleInstruments(e: FormEvent<HTMLInputElement>) {
    if (e.currentTarget.checked)
      setSong({ ...song, instrumentsNotRequired: [...song.instrumentsNotRequired!, e.currentTarget.value] })

    if (!e.currentTarget.checked)
      setSong({ ...song, instrumentsNotRequired: song.instrumentsNotRequired!.filter(ins => ins !== e.currentTarget.value) })
  }

  function handleSolo(e: FormEvent<HTMLInputElement>) {
    if (e.currentTarget.checked)
      setSong({ ...song, hasSolo: true })
    if (!e.currentTarget.checked)
      setSong({ ...song, hasSolo: false })
  }

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
      moodId: song.moodId,
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

          <label className="mt-4 mb-2 text-sm font-semibold">Duration</label>
          <div className="flex flex-col">
            <div>
              <label className="mr-2 text-xs font-semibold">Minutes</label>
              <input
                min={0}
                type="number"
                onChange={(e) => setDurationInMin(parseInt(e.target.value))}
                className="border-2 p-2 mb-2 w-1/3 border-gray-200"
                value={durationInMin}
                placeholder="min..."
              />
            </div>
            <div>
              <label className="mr-2 text-xs font-semibold">Seconds</label>
              <input
                type="number"
                min={0}
                max={59}
                onChange={(e) => setDurationInSec(parseInt(e.target.value))}
                className="border-2 p-2 w-1/3 border-gray-200"
                value={durationInSec}
                placeholder="secs..."
              />
            </div>
          </div>

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
                  defaultChecked={song.instrumentsNotRequired?.includes(instrument.id)}
                  onChange={handleInstruments}
                  className="w-[10] h-[10]"
                  value={instrument.id}
                />
              </div>
            )}
          </div>

          <div className="mt-4">
            <label className="mr-2 text-sm font-semibold">Is there a solo?</label>
            <input
              type="checkbox"
              checked={song.hasSolo}
              className="border-2 p-2 border-gray-200"
              onClick={handleSolo}
            />
          </div>

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