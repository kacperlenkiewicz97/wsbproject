import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Form, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../models/product';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit{

  freshnessList= ["Nowy", "Używany", "Odnowiony"];
  productForm !: FormGroup;
  actionBtn : string = "Zapisz";
  editProductId : string ="";

  constructor(private formBuilder:FormBuilder, private api : ApiService, private dialogRef : MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA)public editData:any){
    
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      Name:['',Validators.required],
      Category:['',Validators.required],
      Freshness:['',Validators.required],
      Price:['',Validators.required],
      Comment:['',Validators.required],
      Date:['',Validators.required],

    });


    if(this.editData){
      this.actionBtn="Edytuj";
      let dateString = this.editData.Date;
      let formattedDate = new Date(dateString);
      this.productForm.controls['Name'].setValue(this.editData.Name);
      this.productForm.controls['Category'].setValue(this.editData.Category);
      this.productForm.controls['Date'].setValue(formattedDate);
      this.productForm.controls['Freshness'].setValue(this.editData.Freshness);
      this.productForm.controls['Price'].setValue(this.editData.Price);
      this.productForm.controls['Comment'].setValue(this.editData.Comment);
    }
  }


  addProduct(){

    if(!this.editData){
      if(this.productForm.valid){

        const product=new Product();
        product.Name=this.productForm.controls['Name'].value;
        product.Category=this.productForm.controls['Category'].value;
        product.Date=formatDate(this.productForm.value.Date, 'MM.dd.yyyy', 'en');
        product.Freshness=this.productForm.controls['Freshness'].value;
        product.Price=this.productForm.controls['Price'].value;
        product.Comment=this.productForm.controls['Comment'].value;
        this.api.addProduct(product)
        .then(doc =>{
          if(doc){
            console.log(doc);
            alert("Product added success");
            this.dialogRef.close('added');
          }
          else{
            alert("Problem during add product");
          }
        })
      .catch(err =>{
        alert(err);
      });
        
      }
      }else{
        const product=new Product();
        product.id=this.editData.id;
        product.Name=this.productForm.controls['Name'].value;
        product.Category=this.productForm.controls['Category'].value;
        product.Date=formatDate(this.productForm.value.Date, 'MM.dd.yyyy', 'en');
        product.Freshness=this.productForm.controls['Freshness'].value;
        product.Price=this.productForm.controls['Price'].value;
        product.Comment=this.productForm.controls['Comment'].value;
        this.api.updateProduct(product)
        .then(doc =>{
            alert("Updated succes");
            this.productForm.reset();
            this.dialogRef.close('updated');
        })
      .catch(err =>{
        alert(err);
      });
        
        
    }

  }

}
