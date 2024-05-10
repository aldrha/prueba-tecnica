import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginRequestModel } from 'src/app/core/model/login.model';

export class LoginForm extends FormGroup {
  readonly email = this.get('email') as FormControl;
  readonly password = this.get('password') as FormControl;

  constructor(
    readonly model: LoginRequestModel,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    super(
      fb.group({
        email: [model?.email, Validators.required],
        password: [model?.password, Validators.required],
      }).controls
    );
  }
}
