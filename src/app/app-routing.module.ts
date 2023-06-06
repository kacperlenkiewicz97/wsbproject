import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudComponent } from './components/crud/crud.component';
import { StatsComponent } from './components/stats/stats.component';

const routes: Routes = [
  { path: 'crud', component: CrudComponent },
  { path: 'stats', component: StatsComponent },
  { path: '',   redirectTo: '/crud', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
