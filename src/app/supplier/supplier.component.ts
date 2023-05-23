import { Component } from '@angular/core';
import { SupplierService } from '../supplier.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Supplier } from '../supplier';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent {

  suppliers: Supplier[] = [];
  isEditing: boolean = true;
  formGroupClient: FormGroup;

  constructor(private supplierService: SupplierService,
    private formBuilder: FormBuilder) {
    this.formGroupClient = formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
      address: [''],
      phone: ['']
    });
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
     if (this.isEditing)
     {
       this.supplierService.update(this.formGroupClient.value).subscribe(
         {
           next: () => {
             this.loadSuppliers();
             this.formGroupClient.reset();
             this.isEditing = false;
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
 
         }
       }
     )
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
   clean (){
   this.formGroupClient.reset();
   this.isEditing = false;
   }
 }