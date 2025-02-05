import { Component, ViewChild, ViewContainerRef, Input, OnInit, Type, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef, static: true })
  dynamicComponentContainer!: ViewContainerRef

  @Input() component!: Type<any>
  @Input() data: any
  @Output() close = new EventEmitter<void>()

  ngOnInit(): void {
    this.loadComponent()
  }

  loadComponent(): void {
    this.dynamicComponentContainer.clear()
    const componentRef = this.dynamicComponentContainer.createComponent(this.component)

    // Pass data to the dynamic component
    if (this.data) {
      Object.assign(componentRef.instance, this.data)
    }
  }

  closeModal(): void {
    this.close.emit()
  }
}
