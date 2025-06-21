import type { DocumentData } from "firebase/firestore";
import { Link } from "react-router-dom"

function TableOne({ item }: { item: DocumentData }) {

  const keys = Object.keys(item);

  return (
    <table className="border-collapse text-left">
      <thead>
        <tr>
          {keys.map(key => <th key={key} className="border capitalize border-gray-500 p-3">{key}</th>)}
          <th className="border border-gray-500 p-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr >
          {keys.map((key, idx) => (
            <td key={key} className="border border-gray-500 p-3">{`${Object.values(item)[idx]}`}</td>
          ))}
          <td className="border border-gray-500 p-3 hover:bg-teal-100">
            <Link to={`edit`}>Editer</Link>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default TableOne