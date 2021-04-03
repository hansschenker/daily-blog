import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employees',
  template: `

<form [formGroup]="empForm" (ngSubmit)="onSubmit()">

  <div formArrayName="employees">

    <div *ngFor="let employee of employees().controls; let empIndex=index">

      <div [formGroupName]="empIndex" style="border: 1px solid blue; padding: 10px; width: 600px; margin: 5px;">
        {{empIndex}}
        First Name :
        <input type="text" formControlName="firstName">
        Last Name:
        <input type="text" formControlName="lastName">

        <button (click)="removeEmployee(empIndex)">Remove</button>


        <div formArrayName="skills">

          <div *ngFor="let skill of employeeSkills(empIndex).controls; let skillIndex=index">



            <div [formGroupName]="skillIndex">
              {{skillIndex}}
              Skill :
              <input type="text" formControlName="skill">
              Exp:
              <input type="text" formControlName="exp">

              <button (click)="removeEmployeeSkill(empIndex,skillIndex)">Remove</button>

            </div>

          </div>
          <button type="button" (click)="addEmployeeSkill(empIndex)">Add Skill</button>
        </div>


      </div>

    </div>
  </div>

  <p>
    <button type="submit">Submit</button>
  </p>

</form>


<p>
  <button type="button" (click)="addEmployee()">Add Employee</button>
</p>
<router-outlet></router-outlet>
{{this.empForm.value | json}}
  `,
  styles: [
  ]
})
export class EmployeesComponent {

  empForm:FormGroup;


  constructor(private fb:FormBuilder) {

    this.empForm=this.fb.group({
      employees: this.fb.array([]) ,
    })
  }


  employees(): FormArray {
    return this.empForm.get("employees") as FormArray
  }


  newEmployee(): FormGroup {
    return this.fb.group({
      firstName: '',
      lastName: '',
      skills:this.fb.array([])
    })
  }


  addEmployee() {
    console.log("Adding a employee");
    this.employees().push(this.newEmployee());
  }


  removeEmployee(empIndex:number) {
    this.employees().removeAt(empIndex);
  }


  employeeSkills(empIndex:number) : FormArray {
    return this.employees().at(empIndex).get("skills") as FormArray
  }

  newSkill(): FormGroup {
    return this.fb.group({
      skill: '',
      exp: '',
    })
  }

  addEmployeeSkill(empIndex:number) {
    this.employeeSkills(empIndex).push(this.newSkill());
  }

  removeEmployeeSkill(empIndex:number,skillIndex:number) {
    this.employeeSkills(empIndex).removeAt(skillIndex);
  }

  onSubmit() {
    console.log(this.empForm.value);
  }


}


export class country {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}




