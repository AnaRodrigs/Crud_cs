import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../supplier.service';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { Supplier } from '../supplier';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})

export class SupplierComponent implements OnInit {

  suppliers: Supplier[] = [];
  isEditing: boolean = false;
  isChecked: boolean = false; 
  formGroupClient: FormGroup;
  message : string =''

  constructor(private supplierService: SupplierService,
    private formBuilder: FormBuilder) {
    this.formGroupClient = formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
      product :[''],
      demand: [''],
      address: [''],
      phone: [''],
      isChecked: ['',[Validators.required]],
     

      
    });
  }
  clean (){
    this.formGroupClient.reset();
    this.isEditing = false;
    this.isChecked = false;
    }

  doSomething(){
  
    if(this.isChecked==true){
      console.log('checkbox is unchecked ');
    }
    else{
      console.log('checkbox is checked');
     
    }
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
   this.isChecked = true;
   if (this.formGroupClient.valid)
   {
    if (this.isEditing)
     {
       this.supplierService.update(this.formGroupClient.value).subscribe(
         {
           next: () => {
             this.loadSuppliers();
             this.formGroupClient.reset();
             this.isEditing = false;
             this.isChecked = false;
            
            
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
           this.isChecked= false;
          
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
 

 
 