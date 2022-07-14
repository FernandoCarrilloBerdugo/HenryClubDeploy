import { useEffect, useState } from "react"
import './AddImages.css'
import { getAlbum, postImages } from "../../redux/Actions/Action";
import { useDispatch, useSelector } from "react-redux/es/exports";
import swal from "sweetalert";


export default function AddImages() {
    const dispatch = useDispatch()
    // const {albumId} = useParams()
    const album = useSelector(state => state.albums);
    const [photo, setPhoto] = useState({
        name: "",
        image: "",
        album: 0
    })

    console.log(photo)

    // const [images, setImages] = useState([])

    const uploadImage = async e => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'Galeria');
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/proyectohenry/upload',
            {
                method: 'POST',
                body: data,
            }
        );
        const file = await res.json();
        console.log(file.secure_url);
        setPhoto({ ...photo, image: file.secure_url })
        console.log('cloudinary', photo)
        // setInput(file.secure_url);
    };

    // const onDrop = useCallback((acceptedFiles, rejectFiles) => {
    //     acceptedFiles.forEach(file => {
    //         const reader = new FileReader()
    //         reader.onload = () => {
    //             setImages(prevState => [...prevState, reader.result])
    //         }
    //         reader.readAsDataURL(file)
    //     })
    //     console.log('acceptedFiles', acceptedFiles);
    //     console.log('rejectFiles', rejectFiles)
    // }, [])

    useEffect(() => {
        dispatch(getAlbum());
    }, [dispatch]);


    // const {getRootProps, getInputProps, isDragActive } = useDropzone({
    //     onDrop,
    //     accept: {'image/png': ['.png'], 'image/jpg': ['.jpg']}
    // })

    const HandleChange = e => {
        setPhoto({
            ...photo,
            [e.target.name]: e.target.value
        })
    }

    const handleSelect = e => {
        setPhoto({
            ...photo,
            album: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        dispatch(postImages(photo))
        setPhoto({
            name: "",
            image: "",
            album: 0
        })

    }

    return (
        <div className="photo">
            <h2 className="tituloAgregarFoto">Agrega una imagen a tu album</h2>
            <form className="agregarphoto">
                <select
                    className="select"
                    name="albumId"
                    id="albumId"
                    onChange={e => handleSelect(e)}
                >
                    <option value="">Elegir album</option>
                    {
                        album.lenght !== 0
                            ? album?.map(e => (
                                <option key={e.id} value={e.id}>
                                    {e.name}
                                </option>
                            ))
                            : null
                    }
                </select>
                <input
                    name="name"
                    type="text"
                    placeholder="Nombre de la imagen"
                    onChange={HandleChange}
                    value={photo.name}
                    className='espacio'
                />
                <input
                    name="file"
                    type="file"
                    placeholder="Sube tu Imagen"
                    onChange={uploadImage}
                    value=""
                    className='espacio'
                />
                <img
                    src={
                        photo.image ||
                        'https://www.yiwubazaar.com/resources/assets/images/default-product.jpg'
                    }
                    alt='img not found'
                    className='imagen'
                />
                <button onClick={() => handleSubmit()} type="button">Ok</button>
            </form>
        </div>
        // <div>
        //     <div className="dropzone" {...getRootProps()}>
        //         <input {...getInputProps()} />
        //         {isDragActive ? 'Drag Active' : 'You can drop your files here.'}
        //     </div>
        //     {
        //         images.length > 0 &&
        //         <div>
        //             {
        //                 images.map((image, index) => <img className="select-images" src={image} key={index} />)
        //             }
        //         </div>
        //     }
        //     {
        //         photo.length > 0 && 
        //         <button onClick={uploadImage}>Cargar imagenes</button>
        //     }
        // </div>
    )
}