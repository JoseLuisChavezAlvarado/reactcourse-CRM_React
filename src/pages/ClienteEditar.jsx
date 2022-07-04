import Formulario from "../components/Formulario";
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'

const ClienteEditar = () => {

    const { id } = useParams()

    const [cargando, setCargando] = useState(true)
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

    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
            <p className="mt-3">Utiliza este formulario para editar los datos del cliente</p>

            {
                cliente.nombre
                    ? <Formulario cliente={cliente} cargando={cargando} />
                    : <p>Id de cliente inválido</p>
            }
        </>
    );
}

export default ClienteEditar;