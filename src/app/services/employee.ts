import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Employee {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/employees';

  getEmployees() {
    return this.http.get<any[]>(this.apiUrl);
  }

  addEmployee(employee: any) {
    return this.http.post<any>(this.apiUrl, employee);
  }

  updateEmployee(id: number, employee: any) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, employee);
  }

  deleteEmployee(id: number) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

}
