import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  constructor(private clientService: ClientService,
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
     if (this.isEditing)
     {
       this.clientService.update(this.formGroupClient.value).subscribe(
         {
           next: () => {
             this.loadClients();
             this.formGroupClient.reset();
             this.isEditing = false;
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
 
         }
       }
     )
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
 