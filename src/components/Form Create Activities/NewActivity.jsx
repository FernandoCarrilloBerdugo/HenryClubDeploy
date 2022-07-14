import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory, getSport, getTeacher, createActivity } from "../../redux/Actions/Action";
import currentDate from "../../utils/functions/currentDate";
import validate from "../Form Create Activities/validate"
import s from './NewActivity.module.css';

export default function NewActivity() {

  const dispatch = useDispatch()

  const state = useSelector(state => state)

  const today = currentDate()


  useEffect(() => {
    dispatch(getCategory());
    dispatch(getTeacher());
    dispatch(getSport());
  }, [dispatch])

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    day: "",
    start: "",
    finish: "",
    description: "",
    fee: "",
    sportId: "",
    categoryId: "",
    userId: "",
  });

  const [errors, setErrors] = useState({
  })

  const handleSelect = (e) => {
    e.preventDefault()
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const HandleChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }));
  };
  //   console.log(input)
  // console.log(state)



  const onSubmit = (e) => {
    e.preventDefault();
    if (input.start !== "" && input.day !== "" && input.finish !== "" &&
      input.fee !== "" && input.userId !== "" && input.sportId !== "" &&
      input.description !== "" && input.categoryId !== "");
    else if (
      !Object.keys(errors).length)
      setLoading(true);
    dispatch(createActivity(input))
    setInput({
      day: "",
      start: "",
      finish: "",
      description: "",
      fee: "",
      sportId: "",
      categoryId: "",
      userId: "",
    });
    setLoading(false);

  };

  return (
    <div className={s.new}>
      <div className={s.wrapper}>
        <div className={s.loginTitle2}> <h3 >Crear nueva actividad</h3> </div>
        <form className={s.Form} onSubmit={onSubmit}>
          <>
            {input.day && input.day.length < 3 ? <small>dias de la actividad</small> : null}
            <input className={s.input}
              onChange={HandleChange}
              value={input.day}
              name="day"
              id="day"
              type="date"
              min={today}
              placeholder="day of the activity"
              autoComplete="off"
            />
            {errors.day && <p className={s.errors}>{errors.day}</p>}
          </>
          <>
            {!input.start ? <small>horarios entre 9hs - 20hs</small> : null}
            <input className={s.input}
              onChange={HandleChange}
              value={input.start}
              name="start"
              id="start"
              type="time"
              min="09:00"
              max="20:00"
              placeholder="Start activity"
              autoComplete="off"
            />
            {errors.start && <p className={s.errors}>{errors.start}</p>}
          </>
          <>
            {!input.finish ? <small>horarios entre 9hs - 20hs</small> : null}
            <input className={s.input}
              onChange={HandleChange}
              value={input.finish}
              name="finish"
              id="finish"
              type="time"
              min="09:00"
              max="20:00"
              placeholder="Finish activity"
              autoComplete="off"
            />
            {errors.finish && <p className={s.errors}>{errors.finish}</p>}
          </>
          <>
            {input.fee < 100 ? <small>mas de 100 pesos argentinos sin puntos</small> : null}
            <input className={s.input}
              onChange={HandleChange}
              value={input.fee}
              name="fee"
              id="fee"
              type="number" min="100" max="100000"
              placeholder="pesos fee"
              autoComplete="off"
            />
            {errors.fee && <p className={s.errors}>{errors.fee}</p>}
          </>
          <div>
            {!input.userId ? <small>Instructor</small> : null}
            <select className={s.select} onChange={handleSelect} name="userId">
              <option value=""> Seleccionar Instructor</option>
              {state.teacher && state.teacher.map((userId) => (
                <option key={userId.id} value={userId.id}>{userId.name}</option>
              ))}
            </select>
          </div>

          <div>
            {!input.sportId ? <small>Deporte</small> : null}
            <select className={s.select} onChange={handleSelect} name="sportId">
              <option value=""> Seleccionar Deporte</option>
              {state.sport &&
                state.sport.map((sportId) => (
                  <option key={sportId.id} value={sportId.id}>
                    {sportId.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            {!input.categoryId ? <small>Categoria</small> : null}
            <select className={s.select} onChange={handleSelect} name="categoryId">
              <option value=""> Seleccionar Category</option>
              {state.category &&
                state.category.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <>
            {input.description && input.description.length < 10 ? <small>Descripcion</small> : null}
            <textarea className={s.input}
              onChange={HandleChange}
              value={input.description}
              name="description"
              id="description"
              type="text"
              placeholder=" Description for Activity"
              autoComplete="off"
            />
            {errors.description && <p className={s.errors}>{errors.description}</p>}
          </>
          <button className={s.submit} type="submit"  >{loading ? "Cargando..." : "Crear"}</button>
        </form>
      </div>
    </div>
  );
}


