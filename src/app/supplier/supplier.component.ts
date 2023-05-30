import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../supplier.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Supplier } from '../supplier';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  opcaoSelecionada: any;
  suppliers: Supplier[] = [];
  isEditing: boolean = false;
  isChecked: boolean = false;
  formGroupClient: FormGroup;
  submitted: boolean = false;

  constructor(
    private supplierService: SupplierService,
    private formBuilder: FormBuilder
  ) {
    this.formGroupClient = formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      product: [''],
      demand: [''],
      town: [''],
      phone: [''],
      isChecked: [''],
      opcaoSelecionada: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers() {
    this.supplierService.getSuppliers().subscribe({
      next: data => (this.suppliers = data)
    });
  }

  save() {
    this.submitted = true;
    this.isChecked = true;
    if (this.formGroupClient.valid) {
      if (this.isEditing) {
        this.supplierService.update(this.formGroupClient.value).subscribe({
          next: () => {
            this.loadSuppliers();
            this.formGroupClient.reset();
            this.isEditing = false;
            this.isChecked = false;
            this.submitted = false;
            this.opcaoSelecionada='';
          }
        });
      } else {
        this.supplierService.save(this.formGroupClient.value).subscribe({
          next: data => {
            this.suppliers.push(data);
            this.formGroupClient.reset();
            this.isChecked = false;
            this.submitted = false;
            this.opcaoSelecionada=this.formGroupClient.value.opcaoSelecionada;

          }
        });
      }
    }
  }

  edit(supplier: Supplier) {
    this.formGroupClient.setValue(supplier);
    this.isEditing = true;
  
  }

  delete(supplier: Supplier) {
    this.supplierService.delete(supplier).subscribe({
      next: () => this.loadSuppliers()
    });
  }

  clean() {
    this.formGroupClient.reset();
    this.isEditing = false;
    this.isChecked = false;
    this.submitted = false;
    this.opcaoSelecionada = '';
  }

  doSomething() {
    if (this.isChecked) {
      console.log('Checkbox is checked');
    } else {
      console.log('Checkbox is unchecked');
    }
  }

  get name(): any{
    return this.formGroupClient.get("name");
  }
  get email(): any{
    return this.formGroupClient.get("email");
  }
}
