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

  suppliers: Supplier[] = [];
  isEditing: boolean = true;
  formGroupClient: FormGroup;
  submitted: boolean = false;

  constructor(private supplierService: SupplierService,
    private formBuilder: FormBuilder) {
    this.formGroupClient = formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
      product: [''],
      demand: [''],
      address: [''],
      phone: [''],
      checkbox:  [null, Validators.required, ],
      
    });
  }
  
  clean (){
    this.formGroupClient.reset();
    this.isEditing = false;
    this.submitted = false;

    }
  ngOnInit(): void {
    this.loadSuppliers();

   }
   loadSuppliers() {
     this.supplierService.getSuppliers (). subscribe(
       {
         next : data => this.suppliers = data
       }
     );
   }

   save (){
    this.submitted = true;
    if (this.formGroupClient.valid) {
      if (this.isEditing)
      {
        this.supplierService.update(this.formGroupClient.value).subscribe(
          {
            next: () => {
              this.loadSuppliers();
              this.formGroupClient.reset();
              this.isEditing = false;
              this.submitted = false;
            }
          }
        )
      }
      else{
      this.supplierService.save(this.formGroupClient.value).subscribe(
        {
          next : data => {
            this.suppliers.push(data)
            this.formGroupClient.reset();
            this.submitted = true;
  
          }
        }
      );
    }
  }
 }
  
 
   edit (supplier : Supplier){
      this.formGroupClient.setValue(supplier);
      this.isEditing = true;
 
   }
 
   delete (supplier : Supplier){
     this.supplierService.delete(supplier).subscribe({
       next : () => this.loadSuppliers()
     })
 
 }

  
 
 }