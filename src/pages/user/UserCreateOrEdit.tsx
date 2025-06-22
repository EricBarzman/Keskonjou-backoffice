import { useEffect, useState, type FormEvent } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom"

import { useUsers } from "../../hooks/people/userHooks";
import type { IMusician, IUser } from "../../types/people.type";

import BackBtn from "../../components/backBtn/backBtn";
import { useMusicians } from "../../hooks/people/musicianHooks";


const emptyUser: IUser = {
  id: "",
  username: "",
  musicianId: "",
  email: "",
  avatarId: "",
  role: "user"
}

function UserCreateOrEdit() {

  let { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { createUser, updateUser, getUserById } = useUsers();
  const { getMusicians } = useMusicians();

  const [user, setUser] = useState<IUser>(emptyUser);
  const [musicians, setMusicians] = useState<IMusician[]>([]);

  useEffect(() => {
    if (id) getUserById(id).then(user => setUser(user));
    getMusicians().then(res => setMusicians(res));
  }, [])

  // Reset everything (specially if user click "create" button)
  useEffect(() => {
    setUser(emptyUser);
  }, [location])


  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // youpi

    if (user?.username === "") {
      alert("Veuillez remplir un nom");
      return
    };
    if (user?.email === "") {
      alert("Veuillez remplir un mail");
      return
    };

    const data = {
      username: user.username,
      email: user.email,
      musicianId: user.musicianId,
      avatarId: user.avatarId,
      role: user.role
    }

    try {
      // Create
      if (!id) {
        const result = await createUser(data);
        if (result) id = result.id;
      }

      // Update
      if (id)
        await updateUser(id, data);

      // Go to the newly created/updated entry
      navigate(`/people/user/${id}`);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <aside className='py-6 px-20 border-l w-1/3'>
      <div>

        <h3 className='font-bold text-xl mb-10'>{user?.username}</h3>

        <form className="p-4 flex flex-col" onSubmit={handleSubmit}>

          <label className="mt-4 mb-2 text-sm font-semibold">Username</label>
          <input
            type="text"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="border-2 p-2 border-gray-200"
            value={user.username}
            placeholder="Username..."
          />

          <label className="mt-4 mb-2 text-sm font-semibold">Email</label>
          <input
            type="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="border-2 p-2 border-gray-200"
            value={user.email}
            placeholder="Mail..."
          />

          <label className="mt-4 mb-2 text-sm font-semibold">Musicians</label>
          <select
            onChange={(e) => setUser({ ...user, musicianId: e.currentTarget.value })}
            className="border-2 p-2 border-gray-200"
            value={user.musicianId}
          >
            <option value="">Choisir un musicien</option>
            {musicians.map(musician => (
              <option value={musician.id}>{musician.firstname} {musician.lastname}</option>
            ))}
          </select>

          <label className="mt-4 mb-2 text-sm font-semibold">Role</label>
          <select
            onChange={(e) => setUser({ ...user, role: e.currentTarget.value as "user" | "admin" })}
            className="border-2 p-2 border-gray-200"
            defaultValue={"user"}
            value={user.role}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button className="cursor-pointer mt-6 rounded-lg p-2 text-white bg-teal-500 hover:bg-teal-600" type="submit">
            OK
          </button>

          {/* Abandon */}
          <div className="mt-4">

            {id && <BackBtn to={`/people/user/${id}`} label="User" />}

            {!id && <BackBtn to="/people/user" label="User" />}
          </div>

        </form>
      </div>
    </aside >
  )
}

export default UserCreateOrEdit