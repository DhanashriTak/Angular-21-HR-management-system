import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Leave } from '../../services/leave';

@Component({
  selector: 'app-leave-list',
  imports: [CommonModule],
  templateUrl: './leave-list.html',
  styleUrl: './leave-list.css',
})
export class LeaveList {

  private leaveService = inject(Leave);
  leaves = signal<any[]>([]);

  ngOnInit() {
    this.leaveService.getLeaves().subscribe((data: any) => {
      this.leaves.set(data);
    });
  }
}
