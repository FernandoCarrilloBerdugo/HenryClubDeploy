import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import {LocationSearching,MailOutline, PermIdentity, PhoneAndroid, Publish} from "@material-ui/icons";
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import s from "./UserProfile.module.css";
import {
    detailMember,
   updateMember } from "../../redux/Actions/Action";
   import foto from"../../utils/fotos/foto.jpg.jpeg"

 export default function UserProfile () {
  const {id}= useParams()
   const dispatch= useDispatch();
  const detail = useSelector (state => state.memberDetail);
    const[input, setInput]= useState({
      name: "", 
      surname: "",
       address: "",
        phone: "", 
        email: "",
         username: "",
    })


    useEffect(() => {
        dispatch( detailMember(id));
      }, [dispatch]);
    console.log(detail)
    // console.log(input)

  const HandleChange = (e) => {
     e.preventDefault();
    const{name, value}=e.target;
    setInput({...input,[name]:value})
  };

  const EditarMember = (id,input) => {
    dispatch(updateMember(id, input))
    setInput({
      name: "", 
      surname: "",
       address: "",
        phone: "", 
        email: "",
         username: "",
    })
  };

    return (
        <div className={s.user}>
          <div className={s.userTitleContainer}>
            <h1 className={s.userTitle}>Edit User</h1>
          </div>
          <div className={s.userContainer}>
            <div className={s.userShow}>
              <div className={s.userShowTop}>
                <img
                  src={foto}
                  alt=""
                  className={s.userShowImg}
                />
                <div className={s.userShowTopTitle}>
                  <span className={s.userShowUsername}>    {detail.name}  {detail.surname}</span>
                 <br />
                  <span className={s.userShowUserTitle}>Socio N° {detail.membershipNumber}</span>
                </div>
              </div>
              <div className={s.userShowBottom}>
                <span className={s.userShowTitle}>Account Details</span>
                <div className={s.userShowInfo}>
                  <PermIdentity className={s.userShowIcon} />
                  <span className={s.userShowInfoTitle}>{detail.username}</span>
                </div>
                <div className={s.userShowInfo}>
                  <FolderOpenIcon className={s.userShowIcon} />
                  <span className={s.userShowInfoTitle}>{detail.dni}</span>
                </div>
                <span className={s.userShowTitle}>Contact Details</span>
                <div className={s.userShowInfo}>
                  <PhoneAndroid className={s.userShowIcon} />
                  <span className={s.userShowInfoTitle}>{detail.phone}</span>
                </div>
                <div className={s.userShowInfo}>
                  <MailOutline className={s.userShowIcon}/>
                  <span className={s.userShowInfoTitle}>{detail.email}</span>
                </div>
                <div className={s.userShowInfo}>
                  <LocationSearching className={s.userShowIcon} />
                  <span className={s.userShowInfoTitle}>{detail.address}</span>
                </div>
              </div>
            </div>
            <div className={s.userUpdate}>
              <span className={s.userUpdateTitle}>Edit</span>
              <form className={s.userUpdateForm}>
                <div className={s.userUpdateLeft}>
                  <div className={s.userUpdateItem}>
                    <label>Username</label>
                    <input
                      type="text"
                      placeholder="your name"
                      className={s.userUpdateInput}
                      onChange={HandleChange}
                    />
                  </div>
                  <div className={s.userUpdateItem}>
                    <label>Name</label>
                    <input
                      type="text"
                      placeholder="Name"
                      className={s.userUpdateInput}
                      onChange={HandleChange}
                    />
                  </div>
                  <div className={s.userUpdateItem}>
                    <label>Surname</label>
                    <input
                      type="text"
                      placeholder="surname"
                      className={s.userUpdateInput}
                      onChange={HandleChange}
                    />
                  </div>
                  <div className={s.userUpdateItem}>
                    <label>Email</label>
                    <input
                      type="text"
                      placeholder="correo electronico"
                      className={s.userUpdateInput}
                      onChange={HandleChange}
                    />
                  </div>
                  <div className={s.userUpdateItem}>
                    <label>Phone</label>
                    <input
                      type="text"
                      placeholder="your number phone"
                      className={s.userUpdateInput}
                      onChange={HandleChange}
                    />
                  </div>
                  <div className={s.userUpdateItem}>
                    <label>Address</label>
                    <input
                      type="text"
                      placeholder=" your address"
                      className={s.userUpdateInput}
                      onChange={HandleChange}
                    />
                  </div>
                </div>
                <div className={s.userUpdateRight}>
                  <div className={s.userUpdateUpload}>
                    <img
                      className={s.userUpdateImg}
                      src={foto}
                      alt=""
                    />
                    <label htmlFor="file">
                      <Publish className={s.userUpdateIcon} />
                    </label>
                    <input type="file" id="file" style={{ display: "none" }}  onChange={HandleChange}/>
                  </div>
                  <button type="submit" className={s.userUpdateButton} onChange={()=>EditarMember()}>Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
    
