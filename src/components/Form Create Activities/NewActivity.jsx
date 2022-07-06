
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory, getSport, getTeacher, loginMember } from "../../redux/Actions/Action";
import validate from "../Form Create Activities/validate"
import s from './NewActivity.module.css';

export default function NewActivity() {

  const dispatch = useDispatch()

  const state = useSelector(state => state)

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getTeacher());
    dispatch(getSport());
  }, [dispatch])

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState(
    {

    });

  const [errors, setErrors] = useState({
  })

  const handleSelect = (e) => {
    e.preventDefault()
    console.log(e.target.value)
    console.log(e.target.name)
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
  console.log(input)
console.log(state)



  const onSubmit = (e) => {
    e.preventDefault();
    if (input.start !== "" && input.days !== "" && input.finish !== "" &&
      input.fee !== "" && input.teacherId !== "" && input.sportId !== "" && 
      input.description !== "" && input.categoryId !== "");
    else if (
      !Object.keys(errors).length) {
      setLoading(true);
      dispatch(loginMember())
      setInput({
        days: "",
        start: "",
        finish: "",
        fee: "",
        teacherId: "",
        sportId: "",
        categoryId: "",
        description: "",
      });
      setLoading(false);
    }
  };

  return (
    <div className={s.new}>
      <div className={s.wrapper}>
        <div className={s.loginTitle2}> <h3 >Create New Activity</h3> </div>
        <form className={s.Form} onSubmit={onSubmit}>
          <input className={s.input}
            onChange={HandleChange}
            value={input.days}
            name="days"
            id="days"
            type="days"
            placeholder="Days of the activity"
            autoComplete="off"
          />
          {errors.days && <p className={s.errors}>{errors.days}</p>}

          <input className={s.input}
            onChange={HandleChange}
            value={input.start}
            name="start"
            id="start"
            type="time"
            placeholder="Start activity"
            autoComplete="off"
          />
          {errors.start && <p className={s.errors}>{errors.start}</p>}

          <input className={s.input}
            onChange={HandleChange}
            value={input.finish}
            name="finish"
            id="finish"
            type="time"
            placeholder="Finish activity"
            autoComplete="off"
          />
          {errors.finish && <p className={s.errors}>{errors.finish}</p>}

          <input className={s.input}
            onChange={HandleChange}
            value={input.fee}
            name="fee"
            id="fee"
            type="fee"
            placeholder="pesos fee"
            autoComplete="off"
          />
          {errors.fee && <p className={s.errors}>{errors.fee}</p>}

          <div>
            <select className={s.select} onChange={handleSelect} name="teacher">
              <option value=""> Select Instructor</option>
             {state.teacher&&state.teacher.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                ))} 
            </select>
          </div>

          <div>
            <select className={s.select} onChange={handleSelect} name="sport">
              <option value=""> Select Deporte</option>
              {state.sport &&
                state.sport.map((sport) => (
                  <option key={sport.id} value={sport.id}>
                    {sport.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <select className={s.select} onChange={handleSelect} name="category">
              <option value=""> Select Category</option>
              {state.category &&
                state.category.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
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

          <button className={s.submit} type="submit">{loading ? "Cargando..." : "Crear"}</button>
        </form>
      </div>
    </div>
  );
}


