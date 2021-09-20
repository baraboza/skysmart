export default function validateEmail(email) {
  var pattern  = /\S+@\S+\.\S+/;
  return pattern.test(email);
}