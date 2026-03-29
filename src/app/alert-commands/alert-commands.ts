import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-alert-commands',
  imports: [CommonModule],
  templateUrl: './alert-commands.html',
  styleUrl: './alert-commands.css',
})
export class AlertCommands {
 visible = false;
  type: 'success' | 'warning' = 'success';
  title = '';
  message = '';

  @Output() onConfirm = new EventEmitter<void>();



  show(type: 'success' | 'warning', title: string, message: string) {
    this.type = type;
    this.title = title;
    this.message = message;
    this.visible = true;
  }

  close() {
    this.visible = false;
  }

  confirm() {
    this.onConfirm.emit();
    this.close();
  }
}
