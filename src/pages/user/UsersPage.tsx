import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useUsers } from "../../hooks/people/userHooks";
import type { IUser } from "../../types/people.type";

import CreateBtn from "../../components/createBtn/CreateBtn";
import BackBtn from "../../components/backBtn/backBtn"


function UsersPage() {

  const location = useLocation();
  const { getUsers } = useUsers();
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    getUsers().then(users => setUsers(users));
  }, [location])

  // if (users.length === 0) return <h2>Aucun user trouvé</h2>

  return (
    < main className='py-6 px-20 w-1/2' >

      <h3 className='font-bold text-xl mb-6'>Users</h3>

      <div className="w-1/2 mb-5">
        <BackBtn to="/people" label="People" />
      </div>

      <CreateBtn link="/people/user/add" />

      {users.length > 0 && (
        < div className='py-6'>
          <table className="border-collapse text-left">
            <thead>
              <tr>
                <th className="border border-gray-500 p-3">Index</th>
                <th className="border capitalize border-gray-500 p-3">Username</th>
                <th className="border capitalize border-gray-500 p-3">Email</th>
                <th className="border border-gray-500 p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td className="border border-gray-500 p-3">{index + 1}</td>
                  <td className="border border-gray-500 p-3">{user.username}</td>
                  <td className="border border-gray-500 p-3">{user.email}</td>
                  <td className="border border-gray-500 p-3 hover:bg-amber-300">
                    <Link to={`/people/user/${user.id}`}>Voir</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </main >
  )
}

export default UsersPage