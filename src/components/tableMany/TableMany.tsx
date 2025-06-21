import type { DocumentData } from "firebase/firestore";
import { Link } from "react-router-dom"

function TableMany({ type, list }: { type: string, list: DocumentData[] }) {

  const keys = Object.keys(list[0]).slice(1, 2);
  
  return (
    <div className='py-6'>
      <table className="border-collapse text-left">
        <thead>
          <tr>
            <th className="border border-gray-500 p-3">Index</th>
            {keys.map(key => <th key={key} className="border capitalize border-gray-500 p-3">{key}</th>)}
            <th className="border border-gray-500 p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <tr key={item.id}>
              <td className="border border-gray-500 p-3">{index + 1}</td>
              {keys.map((key, idx) => (
                <td key={idx} className="border border-gray-500 p-3">{`${Object.values(item)[idx + 1]}`}</td>
              ))}
              <td className="border border-gray-500 p-3 hover:bg-amber-300">
                <Link to={`/${type}/${item.id}`}>Voir</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableMany;
