import { Field, Form, Formik } from 'formik'
import * as Yup from "yup"
import Alerta from './Alerta'
import { useNavigate } from "react-router-dom";

const Formulario = ({ cliente, cargando }) => {

    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string().min(3, 'El nombre es muy corto').max(20, 'El nombre es muy largo').required('El nombre del cliente es obligatorio'),
        empresa: Yup.string().required('El nombre de la empresa es obligatorio'),
        email: Yup.string().required('El email es obligatorio').email('Email no válido'),
        telefono: Yup.number().integer('Número no válido').positive('Número no válido').typeError('Número no válido')
    })

    const handleSubmit = async valores => {
        try {
            let respuesta;
            if (cliente.id) {
                //EDITAR REGISTRO
                const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`
                respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } else {
                //NUEVO REGISTRO
                const url = import.meta.env.VITE_API_URL
                respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }

            await respuesta.json()
            navigate('/clientes')
        } catch (error) {
            console.log(error);
        }
    }

    if (cargando) {
        return <Spinner />
    }

    return (
        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:width-3/4 mx-auto">
            <h1 className="text-gray-600 font-bold text-xl uppercase text-center">{cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h1>

            <Formik
                onSubmit={async (values, { resetForm }) => {
                    await handleSubmit(values)
                    resetForm()
                }}
                validationSchema={nuevoClienteSchema}
                enableReinitialize={true}
                initialValues={{
                    nombre: cliente?.nombre ?? '',
                    empresa: cliente?.empresa ?? '',
                    email: cliente?.email ?? '',
                    telefono: cliente?.telefono ?? '',
                    notas: cliente?.notas ?? ''
                }}>

                {({ errors, touched }) => {

                    return (
                        <Form className='mt-10'>

                            <div className='mb-4'>
                                <label
                                    className='text-gray-800'
                                    htmlFor='nombre'>Nombre:</label>
                                <Field
                                    className='mt-2 block w-full p-3 bg-gray-50 '
                                    placeholder='Nombre del Cliente'
                                    name='nombre'
                                    id='nombre'
                                    type='name' />

                                {
                                    (errors.nombre && touched.nombre) &&
                                    <Alerta>{errors.nombre}</Alerta>
                                }
                            </div>

                            <div className='mb-4'>
                                <label className='text-gray-800'
                                    htmlFor='empresa'>Empresa:</label>
                                <Field
                                    className='mt-2 block w-full p-3 bg-gray-50 '
                                    placeholder='Empresa del Cliente'
                                    name='empresa'
                                    id='empresa'
                                    type='text' />

                                {
                                    (errors.empresa && touched.empresa) &&
                                    <Alerta>{errors.empresa}</Alerta>
                                }
                            </div>

                            <div className='mb-4'>
                                <label className='text-gray-800'
                                    htmlFor='email'>Email:</label>
                                <Field
                                    className='mt-2 block w-full p-3 bg-gray-50 '
                                    placeholder='Empresa del Cliente'
                                    name='email'
                                    id='email'
                                    type='email' />

                                {
                                    (errors.email && touched.email) &&
                                    <Alerta>{errors.email}</Alerta>
                                }
                            </div>

                            <div className='mb-4'>
                                <label className='text-gray-800'
                                    htmlFor='telefono'>Teléfono:</label>
                                <Field
                                    className='mt-2 block w-full p-3 bg-gray-50 '
                                    placeholder='Teléfono del Cliente'
                                    name='telefono'
                                    id='telefono'
                                    type='tel' />

                                {
                                    (errors.telefono && touched.telefono) &&
                                    <Alerta>{errors.telefono}</Alerta>
                                }
                            </div>

                            <div className='mb-4'>
                                <label className='text-gray-800'
                                    htmlFor='notas'>Notas:</label>
                                <Field
                                    className='mt-2 block w-full p-3 bg-gray-50 h-40'
                                    placeholder='Notas del Cliente'
                                    as='textarea'
                                    name='notas'
                                    id='notas'
                                    type='tel' />
                            </div>

                            <input
                                className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg rounded-md'
                                value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                                type='submit' />

                        </Form>
                    )
                }}
            </Formik>
        </div>
    );
}

Formulario.defaultProps = {
    cliente: {}
}

export default Formulario;