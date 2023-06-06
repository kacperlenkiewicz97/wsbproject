import { Component, Input } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { Product } from 'src/app/models/product';
import { ApiService } from 'src/app/services/api.service';
Chart.register(...registerables)

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})

export class StatsComponent {
  
  
  constructor(private api : ApiService){}

  products!:Product[];

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = [''];
  public barChartData = [
    {data: [0], label: ''}
  ];
  public barChartType = 'bar';
  public barChartLegend = true;




  ngOnInit(): void {
    this.countCategoryOccurrences();
  }

  countCategoryOccurrences(category: string = '') {
    this.api.readProductCollection().subscribe(data => {
      let categoryCount: { [category: string]: number } = {};
  
      data.forEach(e => {
        const category = e.Category;
        if (category in categoryCount) {
          categoryCount[category]++;
        } else {
          categoryCount[category] = 1;
        }
      });
  
      const kategorie = Object.keys(categoryCount);
      const liczby = Object.values(categoryCount);
      this.barChartLabels = kategorie;
      this.barChartData = [{ data: liczby, label: 'Kategorie' }];
    },
    error => {
      alert("Problem podczas pobierania danych");
      console.log(error);
    });
  }

}
