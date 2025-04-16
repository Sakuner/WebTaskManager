import { Component, HostListener, Input, OnInit } from '@angular/core';
import { TaskItem, User } from '../../api';
import { WebTaskManagerService } from '../../api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit{
  tasks: TaskItem[] = [];
  assignedTasks: TaskItem[] = [];
  pendingAssignedTasks: TaskItem[] = [];
  hasUnsavedChanges = false;
  users: User[] = [];
  selectedUser: User | undefined;
  validationMessage: string = '';

  ngOnInit(): void {
    WebTaskManagerService.getUsers()
      .then(data => {
        this.users = data;
      })
      .catch(error => {
        console.error('Failed to load users', error);
    });
  
    this.fetchAvailableTasks();
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    if (this.hasUnsavedChanges) {
      $event.returnValue = true;
    }
  }

  fetchAvailableTasks() {
    WebTaskManagerService.getTasksAvailable(0, 15)
      .then(tasks => {
        this.tasks = tasks;
        this.validationMessage = '';
      })
      .catch(error => {
        console.error('Error while getting tasks', error);
      });
  }

  fetchTasksForUser() {
    if (this.selectedUser) {
      this.fetchAvailableTasks();
      WebTaskManagerService.getTasksAssigned(this.selectedUser.id ?? '0')
        .then((data) => {
          this.pendingAssignedTasks = [];
          this.assignedTasks = data;
        })
        .catch((error) => this.validationMessage = error?.message ?? 'error');
    }
  }

  onUserSelectionChange() {
    this.fetchTasksForUser();
  }

  saveAssignedTasks() {
    if (this.selectedUser) {
      WebTaskManagerService.postTasksAssign({    
        tasks: this.pendingAssignedTasks.map(t => t.id ?? '0'),
        userId: this.selectedUser.id})
      .then(() => {
        //mocking changes as the assigning isnt saved in any database
        this.assignedTasks = this.pendingAssignedTasks;
        this.hasUnsavedChanges = false;
        this.validationMessage = 'success';
      })
      .catch((error) => {
        this.validationMessage = error?.message ?? 'error';
      });
    }
  }

  assignTaskToUser(task: TaskItem) {
    this.validationMessage = '';
    this.pendingAssignedTasks.push(task);
    this.tasks = this.tasks.filter(t => t.id !== task.id);
    this.hasUnsavedChanges = true;
  }
}
