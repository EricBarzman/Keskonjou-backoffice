import { useParams } from "react-router-dom"
import InstrumentForm from "../../components/instrument/InstrumentForm"

function InstrumentCreateOrEdit() {

  const { id } = useParams();

  return (
    <aside className='py-6 px-20 border-l w-1/3'>
      <InstrumentForm id={id} />
    </aside >
  )
}

export default InstrumentCreateOrEdit