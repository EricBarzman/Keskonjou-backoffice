import { useParams } from "react-router-dom"
import StyleForm from "../../components/style/StyleForm"

function StyleCreateOrEdit() {

  const { id } = useParams();

  return (
    <aside className='py-6 px-20 border-l w-1/3'>
      <StyleForm id={id} />
    </aside >
  )
}

export default StyleCreateOrEdit