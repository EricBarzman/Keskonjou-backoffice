import { useParams } from "react-router-dom"
import FamilyForm from "../../components/family/FamilyForm.tsx"

function FamilyCreateOrEdit() {

  const { id } = useParams();

  return (
    <aside className='py-6 px-20 border-l w-1/3'>
      <FamilyForm id={id} />
    </aside >
  )
}

export default FamilyCreateOrEdit