import { useState } from "react"
import { postAlbum } from "../../redux/Actions/Action"
import { useDispatch } from "react-redux/es/exports"

import './AddAlbum.css'
import swal from "sweetalert"

export default function AddAlbum() {
    const dispatch = useDispatch()
    const [album, setAlbum] = useState({
        name: '',
        description: ''
    })

    const HandleChange = e => {
        setAlbum({
            ...album,
            [e.target.name]: e.target.value
        })
    }

    const HandleSubmit = () => {
        dispatch(postAlbum(album))
        swal({
            title: "Album creado.",
            icon: "success",
            button: "Ok."
        })
        setAlbum({
            name: '',
            description: ''
        })

    }

    return (
        <div className="album">
            <h2 className="tituloCrearAlbum">Crea tu album</h2>
            <div className="creaAlbum">
                <form className="creaAlbum">
                    <input
                        name="name"
                        type='text'
                        value={album.name}
                        placeholder='Ingresa un nombre'
                        onChange={HandleChange}
                        className='espacio'
                    />

                    <input
                        name="description"
                        type='text'
                        value={album.description}
                        placeholder='Ingresa una description'
                        onChange={HandleChange}
                        className='espacio2'
                    />
                    <button onClick={HandleSubmit}>Crear</button>
                </form>
            </div>
        </div>
    )
}