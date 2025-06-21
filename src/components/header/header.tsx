import { Link } from "react-router-dom"

// CSS
const btnClassnames = "hover:bg-gray-200 p-3 rounded-xl bg-gray-100";


function Header() {
  return (
    <header className="h-screen border-r-2 py-3 px-8 flex flex-col justify-around items-base">
      {/* Accueil */}
      <Link className={btnClassnames} to="/">
        Accueil
      </Link>

      {/* Nav */}
      <nav className='flex flex-col justify-between h-1/2 items-base'>
        <Link className={btnClassnames} to="/user">
          People
        </Link>
        <Link className={btnClassnames} to="/instrument">
          Instruments
        </Link>
        <Link className={btnClassnames} to="/song">
          Songs
        </Link>
        <Link className={btnClassnames} to="/gig">
          Gigs
        </Link>
      </nav>

      {/* Sign out */}
      <Link className={btnClassnames} to="/signout">
        Sign out
      </Link>
    </header>
  )
}

export default Header