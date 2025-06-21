import { Link } from 'react-router-dom'

function BackBtn({ label, to }: { label : string, to: string }) {
  return (
    <Link
      className='bg-amber-500 text-white capitalize hover:bg-amber-600 rounded-lg block text-center p-2'
      to={`${to}`}
    >
      Back to {label}
    </Link>
  )
}

export default BackBtn