import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { ApiService } from '../../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Product } from '../../models/product';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent {

  title = 'Angular13Crud';
  displayedColumns: string[] = ['Name', 'Category', 'Date', 'Freshness', 'Price', 'Comment', 'action'];
  dataSource!: MatTableDataSource<any>;
  products!:Product[];
  currentItemName = 'Nie wybrano';
  currentItemPrice = 0;
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog : MatDialog, private api : ApiService){

  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
  this.api.readProductCollection().subscribe(data=>{
  

    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.products=data.map(e=>{
      const model = new Product();
      model.id=e.id;
      model.Name=e.Name;
      model.Category=e.Category;
      model.Date=e.Date;
      model.Freshness=e.Freshness;
      model.Price=e.Price;
      model.Comment=e.Comment;
      console.log(model);
      return model;
    })
  },
  error => {
    alert("Problem podczas pobirania danych");
    console.log(error);
  })
}

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val==='added'){
        this.getAllProducts();
      }
    })
  }


  editProduct(row: any){
    console.log(row);
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='updated'){
        this.getAllProducts();
      }
    })
  }



  deleteProduct(id:string){
    console.log(id);
    if(confirm("Jestes pewny?")){
      this.api.deleteProduct(id);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  rowColor: string = '';

  getRecord(row: any){
    this.currentItemName=row.Name;
    this.currentItemPrice=row.Price;
    // console.log(this.currentItem);\
    row.clicked = !row.clicked;

  }

  showCheaperProducts(price: number) {
    const filteredProducts = this.products.filter((product: Product) => parseInt(product.Price, 10) < price);
    this.dataSource.data = filteredProducts;
  }



}
