import { ValidatorType, RegExp, createSchemaValidator, ValidationResult } from 'farrow-schema/validator'

// validator
class DateType extends ValidatorType<Date> {
  validate(input: unknown) {
    if (input instanceof Date) {
      return this.Ok(input)
    }

    if (typeof input === 'number' || typeof input === 'string') {
      return this.Ok(new Date(input))
    }

    return this.Err(`${input} is not a valid date`)
  }
}

class EmailType extends ValidatorType<string> {
  validate(input: unknown) {
    if (typeof input !== 'string') {
      return this.Err(`${input} should be a string`)
    }

    if (/^example@farrow\.com$/.test(input)) {
      return this.Ok(input)
    }

    return this.Err(`${input} is not a valid email`)
  }
}

// RegExp
let Reg0 = RegExp(/123/)
let Reg1 = RegExp(/abc/i)

let validateReg0 = createSchemaValidator(Reg0)
let validateReg1 = createSchemaValidator(Reg1)

const assertOk = <T>(result: ValidationResult<T>): T => {
  if (result.isOk) return result.value
  // @ts-ignore
  throw new Error(result.value.message)
}

assertOk(validateReg0('123')) //'123'
assertOk(validateReg0('12')) // throw error

assertOk(validateReg1('abc')) // 'abc'
assertOk(validateReg1('ABC')) // 'ABC'
assertOk(validateReg1('cba')) // throw error
