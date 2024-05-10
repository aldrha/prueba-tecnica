import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeModel } from 'src/app/core/model/employee.model';

export class EmployessForm extends FormGroup {
    readonly lastname = this.get('lastname') as FormControl;
    readonly second_surname = this.get('second_surname') as FormControl;
    readonly name = this.get('name') as FormControl;
    readonly middlename = this.get('middlename') as FormControl;
    readonly country_employment = this.get('country_employment') as FormControl;
    readonly type_document = this.get('type_document') as FormControl;
    readonly document_number = this.get('document_number') as FormControl;
    readonly admission_date = this.get('admission_date') as FormControl;
    readonly area = this.get('area') as FormControl;

    constructor (
        readonly model: EmployeeModel,
        readonly fb: FormBuilder = new FormBuilder()
    ) {
        super(
            fb.group({
                lastname: [model?.lastname, [
                    Validators.required,
                    Validators.maxLength(20),
                    Validators.pattern('^[A-Z ]*$')
                ]],
                second_surname: [model?.second_surname,
                [
                    Validators.required,
                    Validators.maxLength(20),
                    Validators.pattern('^[A-Z ]*$')
                ]
                ],
                name: [model?.name, [
                    Validators.required,
                    Validators.maxLength(20),
                    Validators.pattern('^[A-Z ]*$')
                ]],
                middlename: [model?.middlename, [
                    Validators.maxLength(20),
                    Validators.pattern('^[A-Z ]*$')
                ]],
                country_employment: [model?.country_employment, Validators.required],
                type_document: [model?.type_document, Validators.required],
                document_number: [model?.document_number, [
                    Validators.required,
                    Validators.maxLength(20),
                    Validators.pattern('^[a-zA-Z0-9-]*$')
                ]],
                admission_date: [model?.admission_date, [
                    Validators.required,
                    // Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)
                ]],
                area: [model?.area, Validators.required]
            }).controls
        );
    }
} 