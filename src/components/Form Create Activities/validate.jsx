export default function validate(input) {
    let errors ={};
    if (!input.name) {
        errors.name = "Este campo es obligatorio";
      }
      if (!input.days) {
        errors.days = "Este campo es obligatorio";
      }
      if (!input.hours) {
        errors.hours = "Este campo es obligatorio";
      }
      if (!input.fee) {
        errors.fee = "Este campo es obligatorio";
      }
      if (!input.instructor) {
        errors.instructor = "Este campo es obligatorio";
      }
      if (!input.location) {
        errors.location = "Este campo es obligatorio";
      }
      if (!input.maxCapacity) {
        errors.maxCapacity = "Este campo es obligatorio";
      }
      if (!input.description) {
        errors.description = "Este campo es obligatorio";
      }
    return errors;
    }