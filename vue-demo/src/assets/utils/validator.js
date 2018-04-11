'use strict'

class Validator {
  constructor (name, validator) {
    this.name = name
    this.validator = validator
    this.data = {}
    this.initialize()
  }

  initialize () {
    this.rules = this.validator.rules
  }

  validate (value) {
    let { checkers = {}, rules, warnings } = this.validator

    for (let i = 0; i < rules.length; i++) {
      let rule = rules[i]
      let checker = checkers[rule] || Validator.checkers[rule]
      let warning = warnings[rule] || Validator.warnings[rule] || 'not Valid'
      let isValid

      if (!checker) {
        console.warn('please check if the checker exists')
      }

      isValid = checker ? checker(value) : false
      warning = isValid ? '' : warning

      this.data = {
        value,
        isValid,
        warning,
        rule: i === rules.length - 1 && isValid ? '' : rule
      }
      if (!isValid) break
    }
    return this.data
  }

  isValid (value) {
    this.validate(value)
    return this.data.isValid
  }

  reset () {
    this.data = {}
  }
}

Validator.checkers = {
  required (value) {
    return value !== '' && value !== undefined
  },
  validname (value) {
    return /^[a-zA-Z\u4E00-\uFA29]+$/.test(value) && value.length > 2
  },
  validphone (value) {
    return /^1[34578]\d{9}$/.test(value)
  },
  validEnStr (value) {
    return /^[a-zA-Z_]*$/.test(value)
  },
  validLength (value) {
    return value.length > 20
  },
  validDigit (value) {
    return /^\d+$/.test(value)
  },
  validStr (value) {
    return /<script>/.test(value)
  },
  validEmail (value) {
    return /^\w+@\w+\.com$/.test(value)
  }
}

Validator.warnings = {
  required: '不能为空',
  validname: '请输入合法有效的名字',
  validphone: '请输入合法有效的手机号',
  validEnStr: '合法英文字母组合',
  validDigit: '请输入合法数字集合'
}

class FormValidator {
  constructor (validates) {
    this.validates = validates
    this.validators = {}
    this.data = {}
    this.initialize()
  }

  initialize () {
    for (let name in this.validates) {
      let validate = this.validates[name]
      this.validators[name] = new Validator(name, validate)
      this.data[name] = {}
    }
  }

  validate (name, value) {
    let validator = this.validators[name]
    let data = validator.validate(value)
    this.data[name] = data

    return this.data
  }

  isAllValid (values) {
    let flags = []
    if (values) {
      for (let name in values) {
        let data = this.validate(name, values[name])
        flags.push(data[name].isValid)
      }

      return flags.indexOf(false) < 0
    } else {
      console.warn('please input values')
      return false
    }
  }

  reset () {
    for (let name in this.validates) {
      this.data[name] = {}
    }
  }
}

export {Validator, FormValidator}
