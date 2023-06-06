import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { collectionData, CollectionReference, deleteDoc, doc, DocumentData, Firestore, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { addDoc, collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { identifierName } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private myCollection:CollectionReference<DocumentData>

  constructor(private http: HttpClient, private firestore:Firestore) {
    this.myCollection=collection(this.firestore,'Products');
  }

  readProductCollection(){
    return collectionData(this.myCollection,{
      idField:'id',
    }) as Observable<Product[]>
  }
  
  addProduct(product:Product){
    return addDoc(this.myCollection,{
      Name:product.Name,
      Category:product.Category,
      Date:product.Date,
      Freshness:product.Freshness,
      Price:product.Price,
      Comment:product.Comment
    })
  }

  deleteProduct(id:string){
    const docRef = doc(this.myCollection,id);
    deleteDoc(docRef);
  }


  async updateProduct(product:Product){
    const docRef = doc(this.myCollection, product.id);
    const myDoc = await getDoc(docRef);

    if(myDoc.exists()){
      setDoc(docRef,{
        id:product.id,
        Name:product.Name,
        Category:product.Category,
        Date:product.Date,
        Freshness:product.Freshness,
        Price:product.Price,
        Comment:product.Comment
      })
    }
  }
}
