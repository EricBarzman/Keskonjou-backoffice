import { Link } from "react-router-dom"

function PeopleCats() {
  return (
    <main className='py-6 px-20 w-2/5'>
      <h3 className='font-bold text-xl mb-6'>People</h3>
      <ul className="grid grid-cols-1 gap-5">
        <Link
          className='bg-amber-500 text-white hover:bg-amber-600 rounded-lg block w-1/3 text-center p-2'
          to="/people/user"
        >
          Users
        </Link>

        <Link
          className='bg-amber-500 text-white hover:bg-amber-600 rounded-lg block w-1/3 text-center p-2'
          to="/people/musician"
        >
          Musicians
        </Link>

        <Link
          className='bg-amber-500 text-white hover:bg-amber-600 rounded-lg block w-1/3 text-center p-2'
          to="/people/band"
        >
          Bands
        </Link>
      </ul>
    </main>
  )
}

export default PeopleCats