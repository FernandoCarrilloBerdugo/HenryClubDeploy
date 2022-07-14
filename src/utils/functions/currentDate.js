//Función que devuelve la fecha actual usando como separador -

export default function currentDate(){
  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${year}-${month<10?`0${month}`:`${month}`}-${date<10?`0${date}`:`${date}`}`
}