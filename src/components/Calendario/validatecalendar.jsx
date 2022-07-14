export default function validate(newEvent) {
    let errors ={}
      if (newEvent.title&&newEvent.title.length<5) {
        errors.title = "el dia debe ser un dia de la semana";
      }
      if (!newEvent.title) {
        errors.day = "Este campo es obligatorio";
      }
      if (!newEvent.startTime) {
        errors.startTime = "Este campo es obligatorio";
      }
    
      if (newEvent.endTime&&newEvent.startTime>newEvent.endTime) {
        errors.endTime = "debe ser un horario posterior";
      }
       if (!newEvent.endTime) {
        errors.endTime = "Este campo es obligatorio";
      }

      if (!newEvent.startRecur) {
        errors.startRecur = "Este campo es obligatorio";
      }
      if (!newEvent.endRecur) {
        errors.endRecur = "Este campo es obligatorio";
      }
       if (newEvent.endRecur&&newEvent.startRecur>newEvent.endRecur) {
        errors.endRecur = "debe ser una fecha posterior";
      }

      if (!newEvent.sportId) {
        errors.sportId = "Este campo es obligatorio";
      }
    return errors;
    }