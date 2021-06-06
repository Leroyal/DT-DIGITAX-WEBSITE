import { AbstractControl, ValidationErrors } from '@angular/forms';
  
export class PasswordValidator {
    static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {
        console.log("control.value"+control.value)
        if(control.value){
          
        if((control.value as string).indexOf(' ') >= 0){
            return {cannotContainSpace: true}
        }
        }
        else{
         console.log("not found any error")
        }

  
        return null;
    }
}