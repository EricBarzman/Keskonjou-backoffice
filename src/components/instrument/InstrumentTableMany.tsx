import { Link } from "react-router-dom"
import type { IInstrument } from "../../types/instrument.type";

function TableMany({ list }: { list: IInstrument[] }) {

  return (
    <div className='py-6'>
      <table className="border-collapse text-left">
        <thead>
          <tr>
            <th className="border border-gray-500 p-3">Index</th>
            <th className="border capitalize border-gray-500 p-3">Name</th>
            <th className="border border-gray-500 p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((instrument, index) => (
            <tr key={instrument.id}>
              <td className="border border-gray-500 p-3">{index + 1}</td>
              <td className="border border-gray-500 p-3">{instrument.name}</td>
              <td className="border border-gray-500 p-3 hover:bg-amber-300">
                <Link to={`/instrument/instrument/${instrument.id}`}>Voir</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableMany;
