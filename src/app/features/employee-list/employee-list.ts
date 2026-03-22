import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Employee } from '../../services/employee';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList {

  private empService = inject(Employee);
  private fb = inject(FormBuilder);

  employees = signal<any[]>([]);
  selectedEmployeeId = signal<number | null>(null);

  employeeForm = this.fb.group({
    name: '',
    email: '',
    role: '',
    department: '',
  });

  ngOnInit() {
    this.loadEmployee();
  }

  loadEmployee() {
    this.empService.getEmployees().subscribe((data: any) => {
      this.employees.set(data);
    });
  }

  saveEmployee() {
    if (this.selectedEmployeeId() == null) {
      this.empService.addEmployee(this.employeeForm.value).subscribe(() => {
        this.employeeForm.reset();
        this.loadEmployee();
      });
    } else {
      this.empService.updateEmployee(this.selectedEmployeeId()!, this.employeeForm.value).subscribe(() => {
        this.cancelEdit();
        this.loadEmployee();
      });
  }
}

cancelEdit() {
  this.selectedEmployeeId.set(null);
  this.employeeForm.reset();
}

editEmployee(employee: any) {
  this.selectedEmployeeId.set(employee.id);
  this.employeeForm.setValue({
    name: employee.name,
    email: employee.email,
    role: employee.role,
    department: employee.department,
  });
}

deleteEmployee(id: number) {
  this.empService.deleteEmployee(id).subscribe(() => {
    this.loadEmployee();
  });
}

}
