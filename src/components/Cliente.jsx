import { useNavigate } from 'react-router-dom'

const Clientes = ({ cliente, handleEliminar }) => {

    const navigate = useNavigate()

    const { nombre, empresa, email, telefono, id } = cliente

    return (
        <tr className="border-b hover:bg-gray-100">
            <td className="p-3">{nombre}</td>
            <td className="p-3">
                <p><span className="text-gray-800 uppercase font-bold">Email:</span>{email}</p>
                <p><span className="text-gray-800 uppercase font-bold">Tel:</span>{telefono}</p>
            </td>
            <td className="p-3">{empresa}</td>
            <td className="p-3">
                <button
                    onClick={() => navigate(`${id}`)}
                    className="bg-yellow-500 hover:bg-yellow-600 w-full text-white p-2 uppercase font-bold text-xs "
                    type="button"
                >Ver</button>
                <button
                    onClick={() => navigate(`editar/${id}`)}
                    className="bg-blue-600 hover:bg-blue-700 w-full text-white p-2 uppercase font-bold text-xs mt-3"
                    type="button"
                >Editar</button>
                <button
                    className="bg-red-600 hover:bg-red-700 w-full text-white p-2 uppercase font-bold text-xs mt-3"
                    onClick={() => handleEliminar(id)}
                    type="button"
                >Eliminar</button>
            </td>
        </tr>
    );
}

export default Clientes;