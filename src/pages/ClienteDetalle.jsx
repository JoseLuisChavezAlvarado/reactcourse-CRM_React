import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'

const ClienteDetalle = () => {

    const { id } = useParams()

    const [cargando, setCargando] = useState(false)
    const [cliente, setCliente] = useState({})

    useEffect(() => {

        setCargando(true)
        const obtenerClienteAPI = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/${id}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                setCliente(resultado)
            } catch (error) {
                console.log(error);
            } finally {
                setTimeout(() => {
                    setCargando(false)
                }, 1000);
            }
        }

        obtenerClienteAPI()
    }, [])

    if (cargando) {
        return <Spinner />
    }

    if (!Object.keys(cliente).length) {
        return 'No hay resultados'
    }

    return (
        <div>
            <h1 className='font-black text-4xl text-blue-900'>Ver Cliente: {cliente.nombre}</h1>
            <p className='mt-3'>Información del cliente</p>

            {
                cliente.nombre &&
                <p className='text-4xl text-gray-800 mt-10'>
                    <span className='text-gray-500 uppercase font-bold'>Cliente: </span>
                    {cliente.nombre}
                </p>
            }
            {
                cliente.email &&
                <p className='text-4xl text-gray-800 mt-4'>
                    <span className='text-gray-500 uppercase font-bold'>Email: </span>
                    {cliente.email}
                </p>
            }
            {
                cliente.telefono &&
                <p className='text-4xl text-gray-800 mt-4'>
                    <span className='text-gray-500 uppercase font-bold'>Telefono: </span>
                    {cliente.telefono}
                </p>
            }
            {
                cliente.empresa &&
                <p className='text-4xl text-gray-800 mt-4'>
                    <span className='text-gray-500 uppercase font-bold'>Empresa: </span>
                    {cliente.empresa}
                </p>
            }
            {
                cliente.notas &&
                <p className='text-4xl text-gray-800 mt-4'>
                    <span className='text-gray-500 uppercase font-bold'>Notas: </span>
                    {cliente.notas}
                </p>
            }

        </div>
    );
}

export default ClienteDetalle;