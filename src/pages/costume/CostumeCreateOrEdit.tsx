import { useParams } from "react-router-dom"
import CostumeForm from "../../components/costume/CostumeForm"

function CostumeCreateOrEdit() {

  const { id } = useParams();

  return (
    <aside className='py-6 px-20 border-l w-1/3'>
      <CostumeForm id={id} />
    </aside >
  )
}

export default CostumeCreateOrEdit