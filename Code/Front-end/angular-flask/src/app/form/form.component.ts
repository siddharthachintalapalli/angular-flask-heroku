import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  custForm!:FormGroup;
  constructor(private formBuilder:FormBuilder,
     private api:ApiService, 
     @Inject(MAT_DIALOG_DATA) public updateData: any,
     private dialogRef:MatDialogRef<FormComponent>) { }

  ngOnInit(): void {
    this.custForm = this.formBuilder.group({
      CardID:['',Validators.required],
      CustID:['',Validators.required],
      Title:['',Validators.required],
      Country:['',Validators.required],
      Address:['',Validators.required],
      PostalCode:['',Validators.required],
      City:['',Validators.required],
      Mail:['',Validators.required],
      BirthDate:['',Validators.required],
      ValidityDate:['',Validators.required]
    })

    if(this.updateData){
      this.custForm.controls['CardID'].setValue(this.updateData[0]);
      this.custForm.controls['CustID'].setValue(this.updateData[1]);
      this.custForm.controls['Title'].setValue(this.updateData[2]);
      this.custForm.controls['Country'].setValue(this.updateData[3]);
      this.custForm.controls['Address'].setValue(this.updateData[4]);
      this.custForm.controls['PostalCode'].setValue(this.updateData[5]);
      this.custForm.controls['City'].setValue(this.updateData[6]);
      this.custForm.controls['Mail'].setValue(this.updateData[7]);
      this.custForm.controls['BirthDate'].setValue(this.updateData[8]);
      this.custForm.controls['ValidityDate'].setValue(this.updateData[9]);

    }
  }

  add(){
    if(!this.updateData){
      if(this.custForm.valid){
        this.api.addData(this.custForm.value)
        .subscribe({
          next:(res)=>{
            alert("Data Added");
            console.log(res);
            this.custForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            console.log("error");
          }
        })
      }

    }else{
      console.log('update opened');
      this.update();
      this.custForm.reset();
      this.dialogRef.close('update');
    }
    
  }

  update(){
    this.api.updatedata(this.custForm.value,this.updateData[1])
    .subscribe({
      next:(res)=>{
        alert("Data updated");
        console.log(res);
      },
      error:()=>{
        console.log("error while updating");
      }
    })
  }

}
