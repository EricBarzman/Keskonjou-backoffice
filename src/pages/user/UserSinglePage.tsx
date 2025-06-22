import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import type { IUserNested } from "../../types/people.type"
import { useUsers } from "../../hooks/people/userHooks";

import BackBtn from "../../components/backBtn/backBtn";

function UserSinglePage() {

  const [user, setUser] = useState<IUserNested>();
  const { id } = useParams();
  const location = useLocation();

  const { getUserByIdNested, deleteUser } = useUsers();

  const navigate = useNavigate();

  async function handleDelete() {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm("Voulez-vous vraiment supprimer ce user ?")) return;
    await deleteUser(id!);
    navigate("/gig/user");
  }

  useEffect(() => {
    getUserByIdNested(id!).then(data => setUser(data));
  }, [location])


  if (!user) return <h2>User non trouvé</h2>

  return (
    <aside className='py-6 px-20 border-l w-1/3'>

      <h3 className='font-bold text-xl mb-6'>{user.name}</h3>

      <div className='py-6 mb-4 flex flex-col'>
        {/* Table One */}
        <div className='py-6 mb-4 flex flex-col'>
          <table className="border-collapse text-left">
            <thead>
              <tr>
                <th className="border capitalize border-gray-500 p-3">Username</th>
                <th className="border capitalize border-gray-500 p-3">Email</th>
                <th className="border capitalize border-gray-500 p-3">Musicien lié</th>
                <th className="border capitalize border-gray-500 p-3">Role</th>
                <th className="border capitalize border-gray-500 p-3">AvatarId</th>
                <th className="border border-gray-500 p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr >
                <td className="border border-gray-500 p-3">{user.username}</td>
                <td className="border border-gray-500 p-3">{user.email}</td>
                <td className="border border-gray-500 p-3">{user.musician.firstname} {user.musician.lastname}</td>
                <td className="border border-gray-500 p-3">{user.role}</td>
                <td className="border border-gray-500 p-3">{user.avatarId}</td>
                
                <td className="border border-gray-500 p-3 hover:bg-teal-100">
                  <Link to={`edit`}>Editer</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <BackBtn to="/people/user" label="User" />

      <button
        className="p-3 mt-8 bg-red-700 rounded-lg text-white hover:bg-red-800"
        onClick={handleDelete}
      >
        Supprimer
      </button>

    </aside>
  )
}

export default UserSinglePage