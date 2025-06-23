import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState, type FormEvent } from "react";

import { useGigs } from "../../hooks/gigs/gigHooks";
import { useSetlists } from "../../hooks/songs/setlistHooks";
import { useCostumes } from "../../hooks/gigs/costumeHooks";
import { useBands } from "../../hooks/people/bandHooks";

import type { ICostume, IGig } from "../../types/gig.type";
import type { ISetlist } from "../../types/song.type";
import type { IBand } from "../../types/people.type";

import BackBtn from "../../components/backBtn/backBtn";


const emptyGig: IGig = {
  id: "",
  title: "",
  place: "",
  setlists: [],
  costumes: [],
  bands: [],
  date: new Date(),
}

function GigCreateOrEdit() {

  let { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { createGig, updateGig, getGigById } = useGigs();
  const { getSetlists } = useSetlists();
  const { getCostumes } = useCostumes();
  const { getBands } = useBands();

  const [gig, setGig] = useState<IGig>(emptyGig);

  const [setlists, setSetlists] = useState<ISetlist[]>([]);
  const [costumes, setCostumes] = useState<ICostume[]>([]);
  const [bands, setBands] = useState<IBand[]>([]);

  useEffect(() => {
    if (id) getGigById(id).then(gig => setGig(gig));
    getSetlists().then(it => setSetlists(it));
    getCostumes().then(it => setCostumes(it));
    getBands().then(it => setBands(it));
  }, [])

  // Reset everything (if user click "create" button)
  useEffect(() => {
    setGig(emptyGig);
  }, [location])


  function handleMultiple(e: FormEvent<HTMLInputElement>) {
    if (e.currentTarget.checked)
      setGig({
        ...gig,
        [e.currentTarget.name]: [...gig[e.currentTarget.name], e.currentTarget.value]
      })

    if (!e.currentTarget.checked)
      setGig({
        ...gig,
        [e.currentTarget.name]: gig[e.currentTarget.name].filter((id : string) => id !== e.currentTarget.value)
      })
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // youpi

    if (gig?.title === undefined) {
      alert("Veuillez remplir un titre");
      return
    };

    const data = {
      title: gig.title,
      setlists: gig.setlists,
      place: gig.place,
      costumes: gig.costumes,
      bands: gig.bands,
      date: gig.date,
    }

    try {
      // Create
      if (!id) {
        const result = await createGig(data);
        if (result) id = result.id;
      }

      // Update
      if (id)
        await updateGig(id, data);

      // Go to the newly created/updated entry
      navigate(`/gig/gig/${id}`);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <aside className='py-6 px-20 border-l w-1/2'>
      <div>
        <h3 className='font-bold text-xl mb-10'>{gig.name}</h3>
        <form className="p-4 flex flex-col" onSubmit={handleSubmit}>

          <label className="mt-4 mb-2 text-sm font-semibold">Title</label>
          <input
            type="text"
            onChange={(e) => setGig({ ...gig, title: e.target.value })}
            className="border-2 p-2 border-gray-200"
            value={gig.title}
            placeholder="Title..."
          />

          <label className="mt-4 mb-2 text-sm font-semibold">Place</label>
          <input
            type="text"
            onChange={(e) => setGig({ ...gig, place: e.target.value })}
            className="border-2 p-2 border-gray-200"
            value={gig.place}
            placeholder="Place..."
          />

          <label className="mt-4 mb-2 text-sm font-semibold">Date</label>
          <input
            type="date"
            onChange={(e) => setGig({ ...gig, date: e.target.valueAsDate as unknown as Date })}
            className="border-2 p-2 w-1/2 border-gray-200"
          />

          <label className="mt-4 mb-2 text-sm font-semibold">Bands</label>
          <div className="grid grid-cols-3 gap-2">
            {bands.map(band =>
              <div key={band.id}>
                <label className="mt-4 mr-3">{band.name}</label>
                <input
                  type="checkbox"
                  name="bands"
                  defaultChecked={gig.setLists?.includes(band.id)}
                  onChange={handleMultiple}
                  className="w-[15] h-[15]"
                  value={band.id}
                />
              </div>
            )}
          </div>

          <label className="mt-4 mb-2 text-sm font-semibold">Setlists</label>
          <div className="grid grid-cols-3 gap-2">
            {setlists.map(setlist =>
              <div key={setlist.id}>
                <label className="mt-4 mr-3">{setlist.title}</label>
                <input
                  type="checkbox"
                  name="setlists"
                  defaultChecked={gig.setLists?.includes(setlist.id)}
                  onChange={handleMultiple}
                  className="w-[15] h-[15]"
                  value={setlist.id}
                />
              </div>
            )}
          </div>

          <label className="mt-4 mb-2 text-sm font-semibold">Costumes</label>
          <div className="grid grid-cols-3 gap-2">
            {costumes.map(cost =>
              <div key={cost.id}>
                <label className="mt-4">{cost.name}</label>
                <input
                  type="checkbox"
                  name="costumes"
                  defaultChecked={gig.costumes?.includes(cost.id)}
                  onChange={handleMultiple}
                  className="w-[10] h-[10]"
                  value={cost.id}
                />
              </div>
            )}
          </div>

          <button className="cursor-pointer mt-6 rounded-lg p-2 text-white bg-teal-500 hover:bg-teal-600" type="submit">
            OK
          </button>

          {/* Abandon */}
          <div className="mt-4">

            {id && <BackBtn to={`/gig/gig/${id}`} label="Gig" />}

            {!id && <BackBtn to="/gig/gig" label="Gig" />}
          </div>

        </form>
      </div>
    </aside >
  )
}

export default GigCreateOrEdit