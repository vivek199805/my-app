import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import * as $ from "jquery";
// setup simple regex for white listed characters
const validCharacters = /[^\s\w,.:&\/()+%'`@-]/;


export class CustomValidators extends Validators {

  public static firstMinAmount(min: number = 100): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {

      if (control.value !== undefined && (control.value < min)) {
        return { 'firstMinAmountRange': true };
      }
      return null;
    };
  }
  public static lastMaxAmount(max: number = 10000): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {

      if (control.value !== undefined && (control.value > max)) {
        return { 'lastMaxAmountRange': true };
      }
      return null;
    };
  }

  public static checkLastRec(): ValidatorFn {
    return (formArray: AbstractControl): ValidationErrors | null => {
      const vl = formArray.get('mainGroup')?.value
      for (let i = 0; i < vl.length; i++) {
        const element = vl[i].arr;
        for (let j = 0; j < element.length; j++) {
          const sub = element[j];
          if (+element[element.length - 1].slab_max === 10000) {
            break;
          }
        }
      }
      return null;
    }
  };
  public static compairAmount(control: FormControl) {
    if (control.value && control.value.length > 0) {
      const matches = control.value.match(validCharacters);
      return matches
        && matches.length ? { 'not_allowed_characters': matches } : null;
    } else {
      return null;
    }
  }

  public static validateMinAndMax(min: string, max: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      let minVal = (formGroup.get(min) as FormControl)?.value;
      let maxVal = (formGroup.get(max) as FormControl)?.value;
      if (minVal === maxVal) {
        return null;
      }
      if (minVal > maxVal) {
        return { minMaxError: true };
      }
      return null;
    };
  }
  public static is_fixedValue(): ValidatorFn {
    return (formControl: AbstractControl): ValidationErrors | null => {

      let valueVal = formControl.get('value') as FormControl;
      let is_fixedVal = formControl.get('is_fixed') as FormControl;
      // //console.log(valueVal?.value);
      // //console.log(formControl?.value);
      if (is_fixedVal?.value === false && (valueVal?.value > 0.99)) {
        is_fixedVal?.setErrors({ 'trueError': true })
        // return null;
      } else {
        is_fixedVal?.setErrors(null)
      }
      return null;
    };
  }
  static compairRecordValidator(): ValidatorFn {
    return (formArray: AbstractControl): ValidationErrors | null => {
      for (let i = 0; i < formArray.value.length; i++) {
        if (i > 0) {
          const current_min = +formArray.value[i].slab_min;
          const prev_max = +formArray.value[i - 1].slab_max;
          if ((current_min <= prev_max) || (current_min > (prev_max + 1))) {
            return { MinLengthArray: true };
          }
        }
      }
      return null;
    }
  };

  static firstRowMinpay(fixedAmt: number): ValidatorFn {
    return (formArray: AbstractControl): ValidationErrors | null => {
      let iterations = (((formArray.parent as FormGroup)?.controls['arr'] as FormArray)?.controls[0] as FormGroup)?.controls['slab_min'] as FormControl;
      if (iterations?.value && iterations?.value != fixedAmt) {
        iterations?.setErrors({ 'firstMinAmountRange': true })
      }
      return null;
    }
  };

  static firstRowMin(fixedAmt: number = 100): ValidatorFn {
    return (formArray: AbstractControl): ValidationErrors | null => {
      let iterations = (((formArray.parent as FormGroup)?.controls['arr'] as FormArray)?.controls[0] as FormGroup)?.controls['slab_min'] as FormControl;
      if (iterations?.value && iterations?.value != fixedAmt) {
        iterations?.setErrors({ 'firstMinAmountRange': true })
      }
      return null;
    }
  };

  static lastRowMax(fixedAmt: number = 10000): ValidatorFn {
    return (formArray: AbstractControl): ValidationErrors | null => {
      let len = ((formArray.parent as FormGroup)?.controls['arr'] as FormArray)?.value.length;
      let iterations = (((formArray.parent as FormGroup)?.controls['arr'] as FormArray)?.controls[len - 1] as FormGroup)?.controls['slab_max'] as FormControl;
      if (iterations?.value && iterations?.value != fixedAmt) {
        ((formArray.parent as FormGroup)?.controls['validCheck'] as FormArray)?.setErrors({ 'lastMaxAmount': true })
      } else {
        ((formArray.parent as FormGroup)?.controls['validCheck'] as FormArray)?.setErrors(null)
      }
      return null;
    }
  };


  static lastRowMaxpay(fixedAmt: number): ValidatorFn {
    return (formArray: AbstractControl): ValidationErrors | null => {
      let len = ((formArray.parent as FormGroup)?.controls['arr'] as FormArray)?.value.length;
      let iterations = (((formArray.parent as FormGroup)?.controls['arr'] as FormArray)?.controls[len - 1] as FormGroup)?.controls['slab_max'] as FormControl;
      if (iterations?.value && iterations?.value != fixedAmt) {
        ((formArray.parent as FormGroup)?.controls['validCheck'] as FormArray)?.setErrors({ 'lastMaxAmountss': true })
      } else {
        ((formArray.parent as FormGroup)?.controls['validCheck'] as FormArray)?.setErrors(null)
      }
      return null;
    }
  };


  public static validateCommMinAndMax(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      let valuStr: any = formGroup.value;
      let valuInt: any = +formGroup.value;
      // console.log(Number.isInteger(valu));

      let onlyNum: any = /^[0-9]{1,2}([.][0-9]{1,2})?$/;
      let floatRegex: any = /^[0]{1}([.]([2-5][0-9]?|[6]))?$/;
      let numberRegex: any = /^(3[0]|[12][0-9]|[6-9])$/;

      var checkIntRegex = /^\d+$/;
      var checkFloatRegex = /^((\d+(\.\d *)?)|((\d*\.)?\d+))$/;
      var checkBothNumberFloatRegex = /^[+-]?\d+(\.\d+)?([eE][+-]?\d+)?$/;

      // console.log(checkIntRegex.test(valu));
      // console.log(checkFloatRegex.test(valu));
      // console.log(checkNumberRegex.test(valu));


      // console.log(typeof valuStr);
      // console.log(valuStr);
      // console.log(valuInt);
      // console.log(typeof valu);

      if (typeof valuStr == 'string' && valuStr == '' || valuStr == null) {
        return null;
      }

      if (valuStr == '0') {
        return { commRangeError: 'Enter value greater then Zero(0).' };
      }
      // console.log(valuStr.indexOf(".") !== -1);

      if (!checkBothNumberFloatRegex.test(valuStr)) {
        return { commRangeError: 'Enter valid Commission.' };
        // return null;
      }
      if (valuInt % 1 != 0) {
        if (!floatRegex.test(valuStr)) {
          // console.log(valuStr, " Not valid Float");
          return { commRangeError: 'Enter valid percentage.' };
        }
      }
      if (checkIntRegex.test(valuStr)) {
        if (!numberRegex.test(valuStr)) {
          // console.log(valuStr, " Not valid digit");
          return { commRangeError: 'Enter valid Amount.' };
        }
      }


      // } else {
      //   return { notValid: true };
      // }



      // console.log(/^-?[\d.]+(?:e-?\d+)?$/.test(valu));
      // console.log(/[+-]?([0-9]*[.])?[0-9]+/.test(valu));

      // regex for 0.2 - 0.6  ^[0]{1}([.]([2-5][0-9]?|[6]))?$
      // regex for 6 - 30  ^(3[0]|[12][0-9]|[6-9])$


      // let minVal = (formGroup.get(min) as FormControl)?.value;
      // let maxVal = (formGroup.get(max) as FormControl)?.value;
      // if (minVal === maxVal) {
      //   return null;
      // }
      // if (minVal > maxVal) {
      //   return { minMaxError: true };
      // }
      return null;
    };
  }



  static enter_OnlyNumber_OnlyFloatTrue_Both(IsNumberOnly: boolean = false, IsFloatOnly: boolean = false): ValidatorFn {
    return (formControll: AbstractControl): ValidationErrors | null => {
      let val = formControll.value;

      var checkIntRegex = /^\d+$/;
      // var checkFloatRegex = /^((\d+(\.\d *)?)|((\d*\.)?\d+))$/;
      var checkFloatRegexNew = /^[\d]+[.]\d+$/;
      var checkBothNumberFloatRegex = /^[+-]?\d+(\.\d+)?([eE][+-]?\d+)?$/;

      if (typeof val == 'string' && val == '' || val == null) {
        return null;
      }
      
      if (IsFloatOnly && !IsNumberOnly && !checkFloatRegexNew.test(val)) {
        return { numError: 'Enter float value only.' };
      }
      if (!IsFloatOnly && IsNumberOnly && !checkIntRegex.test(val)) {
        return { numError: 'Enter number only' };
      }
      if (!IsFloatOnly && !IsNumberOnly && !checkBothNumberFloatRegex.test(val)) {
        return { numError: "Enter digit's only" };
      }


      return null;
    }
  };
}