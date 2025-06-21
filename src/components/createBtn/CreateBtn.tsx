import { Link } from 'react-router-dom'

function CreateBtn({ link }: { link: string }) {
  return (
    <Link
      className='bg-green-500 text-white hover:bg-green-600 rounded-lg block w-1/3 text-center p-2'
      to={link}
    >
      Créer
    </Link>
  )
}

export default CreateBtn