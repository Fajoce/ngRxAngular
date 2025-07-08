import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { CreateDetailsInvoiceRequest } from '../../models/create-details-invoice-request';
import { CreateInvoiceRequest } from '../../models/CreateInvoiceRequest';
import { createInvoice } from '../../store/invoice/invoice-action';


@Component({
  selector: 'app-invoice-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './invoice-form.component.html',
  styleUrl: './invoice-form.component.css'
})
export class InvoiceFormComponent {
private fb = inject(FormBuilder);
  private store = inject(Store);

  form: FormGroup = this.fb.group({
    saleDate: [new Date().toISOString(), Validators.required],
    clientsId: [null, Validators.required],
    details: this.fb.array([this.createDetailGroup()])
  });

  get details(): FormArray {
    return this.form.get('details') as FormArray;
  }

  createDetailGroup(): FormGroup {
    return this.fb.group({
      productId: [null, Validators.required],
      productName: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [0, [Validators.required, Validators.min(0)]]
    });
  }

  addDetail(): void {
    this.details.push(this.createDetailGroup());
  }

  removeDetail(index: number): void {
    if (this.details.length > 1) {
      this.details.removeAt(index);
    }
  }

  calculateSubtotal(q: number, u: number): number {
    return q * u;
  }

  getTotal(): number {
    return this.details.controls.reduce((sum, group) => {
      const quantity = group.get('quantity')?.value || 0;
      const unitPrice = group.get('unitPrice')?.value || 0;
      return sum + quantity * unitPrice;
    }, 0);
  }

  submit(): void {
    const formValue = this.form.value;

    const details: CreateDetailsInvoiceRequest[] = formValue.details.map((d: any) => ({
      invoiceId: 0,
      productId: d.productId,
      productName: d.productName,
      quantity: d.quantity,
      unitPrice: d.unitPrice,
      subtotal: this.calculateSubtotal(d.quantity, d.unitPrice)
    }));

    const invoice: CreateInvoiceRequest = {
      id: 0,
      saleDate: formValue.saleDate,
      clientsId: formValue.clientsId,
      details,
      total: this.getTotal()
    };

    this.store.dispatch(createInvoice({ invoice }));
  }
}