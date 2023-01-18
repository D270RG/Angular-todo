import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainpageComponent } from './pages/main/mainpage.component';
import { NotFoundComponent } from './pages/notFound/notFound.component';

const routes: Routes = [
  { path: '', component: MainpageComponent},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
