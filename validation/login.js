import Validator from 'validator'
import isEmpty from 'is-empty'

const validateLoginInput = data => {
  let errors = {}

  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''

  if (Validator.isEmpty(data.email)) {
    errors.message = 'Email field is required'
  } else if (!Validator.isEmail(data.email)) {
    errors.message = 'Email is invalid'
  }

  if (Validator.isEmpty(data.password)) {
    errors.message = 'Password field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}

export default validateLoginInput
