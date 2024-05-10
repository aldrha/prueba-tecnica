import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms'; 
import { RegisterRequestModel } from 'src/app/core/model/register.model';
import { ConfirmPasswordValidator } from 'src/app/core/validators/confirmed.validator';

export class RegisterForm extends FormGroup {
  readonly name = this.get('name') as FormControl;
  readonly email = this.get('email') as FormControl;
  readonly password = this.get('password') as FormControl;
  readonly password_confirmation = this.get('password_confirmation') as FormControl;

  constructor(
    readonly model: RegisterRequestModel,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    super(
      fb.group({
        name: [model?.name, Validators.required],
        email: [model?.email, Validators.required],
        password: [
          model?.password,
          [
            Validators.required,
            Validators.minLength(8),
            ConfirmPasswordValidator("password_confirmation", true),
          ],
        ],
        password_confirmation: [
          model?.password_confirmation,
          [
            Validators.required,
            Validators.minLength(8),
            ConfirmPasswordValidator("password"),
          ],
        ],
      }).controls
    );
  }
}
