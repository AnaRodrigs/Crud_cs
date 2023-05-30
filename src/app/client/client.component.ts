import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../client';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  clients: Client[] = [];
  isEditing: boolean = false;
  formGroupClient: FormGroup;
  isChecked: boolean = false; 

  constructor(private clientService: ClientService,
    private formBuilder: FormBuilder) {
    this.formGroupClient = formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
      address: [''],
      phone: [''],
      town: [''],
      isChecked: ['',[Validators.required]],
      
    
    });
  }
  
 

  doSomething(){
  
    if(this.isChecked==true){
      console.log('checkbox is checked ');
    }
    else{
      console.log('checkbox is unchecked');
     
    }
  }

  ngOnInit(): void {
    this.loadClients();
   }
   loadClients() {
     this.clientService.getClients (). subscribe(
       {
         next : data => this.clients = data
       }
     );
   }
 
 
   save (){
   this.isChecked = true;
   if (this.formGroupClient.valid)
   {
    if (this.isEditing)
    {
      this.clientService.update(this.formGroupClient.value).subscribe(
        {
          next: () => {
            this.loadClients();
            this.formGroupClient.reset();
            this.isEditing = false;
            this.isChecked = false;
          }
        }
      )
    }
    else{
    this.clientService.save(this.formGroupClient.value).subscribe(
      {
        next : data => {
          this.clients.push(data)
          this.formGroupClient.reset();
          this.isChecked = false;

        }
      }
    );
  }
}

   }
   
   edit (client : Client){
      this.formGroupClient.setValue(client);
      this.isEditing = true;
 
   }
 
   delete (client : Client){
     this.clientService.delete(client).subscribe({
       next : () => this.loadClients()
     })
 
 }
   clean (){
   this.formGroupClient.reset();
   this.isEditing = false;
   }
   
 }
 
