import { useParams } from "react-router-dom"
import MoodForm from "../../components/mood/MoodForm"

function MoodCreateOrEdit() {

  const { id } = useParams();

  return (
    <aside className='py-6 px-20 border-l w-1/3'>
      <MoodForm id={id} />
    </aside >
  )
}

export default MoodCreateOrEdit