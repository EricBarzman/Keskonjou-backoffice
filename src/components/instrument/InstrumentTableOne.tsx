import { Link } from "react-router-dom"
import type { IInstrumentNested } from "../../types/instrument.type";

function InstrumentTableOne({ instrument }: { instrument: IInstrumentNested }) {

  return (
    <table className="border-collapse text-left">
      <thead>
        <tr>
          <th className="border capitalize border-gray-500 p-3">Name</th>
          <th className="border capitalize border-gray-500 p-3">Family</th>
          <th className="border capitalize border-gray-500 p-3">ID</th>
          <th className="border border-gray-500 p-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr >
          <td className="border border-gray-500 p-3">{instrument.name}</td>
          <td className="border border-gray-500 p-3">{instrument.family.name}</td>
          <td className="border border-gray-500 p-3">{instrument.id}</td>
          <td className="border border-gray-500 p-3 hover:bg-teal-100">
            <Link to={`edit`}>Editer</Link>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default InstrumentTableOne