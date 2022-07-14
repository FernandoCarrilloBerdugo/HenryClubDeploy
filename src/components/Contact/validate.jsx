export default function validations(input) {
  let error = {};
  const nameRegExp = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
  const correoRegExp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const telefonoRegExp = /^\d{7,14}$/;

  if (input.name === '') {
    error.name = 'No puede estar vacío';
  }
  if (!nameRegExp.test(input.name)) {
    error.name = 'el nombre puede contener solo letras y espacios, pueden llevar acentos';
  }
  if (input.surname === '') {
    error.surname = 'No puede estar vacío';
  }
  if (!nameRegExp.test(input.surname)) {
    error.surname = 'el apellido puede contener solo letras y espacios, pueden llevar acentos';
  }

  if (input.email === '') {
    error.email = 'No puede estar vacío';
  }
  if (input.email && !correoRegExp.test(input.email)) {
    error.email = 'formato incorrecto';
  }

  if (input.phone === '') {
    error.phone = 'No puede estar vacío';
  }

  if (input.phone && !telefonoRegExp.test(input.phone)) {
    error.phone = 'Debes ingresar al menos 7 dígitos. PD: Solo podes ingresar números. De ser necesario, inserta tu aclaración abajo en el mensaje';
  }
  if (input.message === '') {
    error.message = 'No puede estar vacío';
  }
  if (input.message && input.message.length < 10) {
    error.message = 'escribe un poco mas';
  }
  return error;
}