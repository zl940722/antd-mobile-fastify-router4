import * as _ from 'lodash'

export function IsEmpty(val) {
  return _.isEmpty(val) || _.isNull(val) || _.isNaN(val)
}