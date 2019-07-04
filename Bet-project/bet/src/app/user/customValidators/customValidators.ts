import { ValidatorFn, FormControl, FormGroup } from '@angular/forms';

function _upperCaseAndLowerCase(): ValidatorFn {
    return (control: FormControl): { [key: string]: boolean } | null => {
        if(control.value !== null) {
            const reg: RegExp = /[A-Za-z]/g;
            const err = reg.test(control.value);
            return err ? null : { 'containUppercaseAndLowercase': false };
        }
    }
}

function _specSymbols(): ValidatorFn {
    return (control: FormControl): { [key: string]: boolean } | null => {
        if(control.value !== null) {
            const reg: RegExp = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
            const err = reg.test(control.value);
            return err ? null : { 'containSpecSymbol': false };
        }
    }
}

function _passwordConfirmation(): ValidatorFn {
    return (control: FormGroup): { [key: string]: boolean } | null => {
        const password = control.get('password');
        const passwordConfirm = control.get('passwordConfirm');
        return password.value && passwordConfirm.value && password.value !== passwordConfirm.value ? { 'passwordMatches': false} : null;
    }
}

export const customValidators = {

    upperCaseAndLowerCase: _upperCaseAndLowerCase(),
    specSymbols: _specSymbols(),
    passwordConfirmation: _passwordConfirmation()

};