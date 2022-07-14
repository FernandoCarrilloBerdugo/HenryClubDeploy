export default function validate(input) {
  let errors ={}
    if (input.day&&input.day.length<5) {
      errors.day = "el dia debe ser un dia de la semana";
    }
    if (!input.day) {
      errors.day = "Este campo es obligatorio";
    }
    if (!input.start) {
      errors.start = "Este campo es obligatorio";
    }
  
    if (!input.fee) {
      errors.fee = "Este campo es obligatorio";
    }
    if (input.fee && input.fee<100) {
      errors.fee = "minimo $100";
    }
    if (!input.userId) {
      errors.userId = "Este campo es obligatorio";
    }
    if (!input.categoryId) {
      errors.categoryId = "Este campo es obligatorio";
    }
    if (!input.sportId) {
      errors.sportId = "Este campo es obligatorio";
    }
    if (!input.finish) {
      errors.finish = "Este campo es obligatorio";
    }
    if (input.start&&input.finish<input.start) {
      errors.finish = "debe ser un horario posterior";
    }
    if (!input.description) {
      errors.description = "Este campo es obligatorio";
    }

    if (input.description&&input.description.length<10) {
      errors.description = "escribe un poco mas";
    }
  return errors;
  }