import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState, type FormEvent } from "react";

import type { ISetlist, ISong } from "../../types/song.type";
import { useSetlists } from "../../hooks/songs/setlistHooks";

import BackBtn from "../../components/backBtn/backBtn";
import { useInstruments } from "../../hooks/instruments/instrumentHooks";
import type { IInstrument } from "../../types/instrument.type";
import generateSetlist from "../../utils/generateSetlist";
import { useSongs } from "../../hooks/songs/songHooks";


const emptySetlist: ISetlist = {
  id: "",
  title: "",
  duration: 0,
  instrumentsNotRequired: [],
  songs: [],
  createdAt: new Date(),
}

function SetlistCreateOrEdit() {

  let { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { createSetlist, getSetlistById, updateSetlist } = useSetlists();
  const { getInstruments } = useInstruments();
  const { getSongs } = useSongs();

  const [setlist, setSetlist] = useState<ISetlist>(emptySetlist);

  const [instruments, setInstruments] = useState<IInstrument[]>([]);
  const [songs, setSongs] = useState<ISong[]>([]);

  const [durationInMin, setDurationInMin] = useState(0);
  const [durationInSec, setDurationInSec] = useState(0);
  const [acceptedLimit, setAcceptedLimit] = useState(0);

  useEffect(() => {
    if (id) getSetlistById(id).then(setlist => setSetlist(setlist));
    getInstruments().then(ins => setInstruments(ins));
    getSongs().then(songs => setSongs(songs));
  }, [])

  // Reset everything (specially if user click "create" button)
  useEffect(() => {
    setSetlist(emptySetlist);
  }, [location])


  // Alter duration
  useEffect(() => {
    setSetlist({ ...setlist, duration: (durationInMin * 60) + durationInSec })
  }, [durationInMin, durationInSec])


  function handleInstruments(e: FormEvent<HTMLInputElement>) {
    if (e.currentTarget.checked)
      setSetlist({ ...setlist, instrumentsNotRequired: [...setlist.instrumentsNotRequired!, e.currentTarget.value] })

    if (!e.currentTarget.checked)
      setSetlist({ ...setlist, instrumentsNotRequired: setlist.instrumentsNotRequired!.filter(ins => ins !== e.currentTarget.value) })
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (setlist?.title === undefined) {
      alert("Veuillez remplir un titre");
      return
    };

    try {
      // Create
      if (!id) {

        // fait appel à l'algorithme KESKONJOU (c) !
        const generatedSetlist = generateSetlist({
          duration: setlist.duration,
          acceptedLimit: setlist.acceptedLimit,
          songs,
        });

        const init = 0;
        const totalDuration = generatedSetlist.reduce((acc, current) => acc + current.duration!, init);

        const data = {
          title: setlist.title,
          duration: totalDuration,
          instrumentsNotRequired: setlist.instrumentsNotRequired,
          songs: generatedSetlist.map(song => song.id) // On ne garde que l'ID
        }

        const result = await createSetlist(data);
        if (result) id = result.id;
      }

      // Update
      if (id) {
        const data = {
          title: setlist.title,
        }
        await updateSetlist(id, data);
      }

      // Go to the newly created/updated entry
      navigate(`/song/setlist/${id}`);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <aside className='py-6 px-20 border-l w-1/2'>
      <div>
        <h3 className='font-bold text-xl mb-10'>{setlist.title}</h3>
        <form className="p-4 flex flex-col" onSubmit={handleSubmit}>

          <label className="mt-4 mb-2 text-sm font-semibold">Title</label>
          <input
            type="text"
            onChange={(e) => setSetlist({ ...setlist, title: e.target.value })}
            className="border-2 p-2 border-gray-200"
            value={setlist.title}
            placeholder="Title..."
          />
          {!id && (
            <div className="mt-4">
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

              <div className="flex flex-col mb-4">
                <label className="mt-4 mb-2 text-sm font-semibold">Accepted limit (in seconds)</label>
                <input
                  min={0}
                  type="number"
                  onChange={(e) => setAcceptedLimit(parseInt(e.target.value))}
                  className="border-2 p-2 mb-2 w-1/3 border-gray-200"
                  value={acceptedLimit}
                  placeholder="secs..."
                />
              </div>

              <label className="mt-4 mb-2 text-sm font-semibold">Instruments NOT required</label>
              <div className="grid grid-cols-3 gap-2">
                {instruments.map(instrument =>
                  <div key={instrument.id}>
                    <label className="mt-4">{instrument.name}</label>
                    <input
                      type="checkbox"
                      defaultChecked={setlist.instrumentsNotRequired?.includes(instrument.id)}
                      onChange={handleInstruments}
                      className="w-[10] h-[10]"
                      value={instrument.id}
                    />
                  </div>
                )}
              </div>
            </div>
          )}


          <button className="cursor-pointer mt-6 rounded-lg p-2 text-white bg-teal-500 hover:bg-teal-600" type="submit">
            OK
          </button>

          {/* Abandon */}
          <div className="mt-4">

            {id && <BackBtn to={`/song/setlist/${id}`} label="Setlist" />}

            {!id && <BackBtn to="/song/setlist" label="Setlist" />}
          </div>

        </form>
      </div>


    </aside >
  )
}

export default SetlistCreateOrEdit