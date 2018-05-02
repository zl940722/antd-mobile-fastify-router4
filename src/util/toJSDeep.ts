import * as _ from 'lodash';
import {isObservable, toJS} from "mobx";

export function toJSDeep(source, detectCycles: boolean = false) {
    const clone = toJS(source, detectCycles);

    _.forEach(clone, function (value, key) {
        if (isObservable(value)) {
            clone[key] = toJSDeep(value, detectCycles);
        }
    });
    return clone;
}
