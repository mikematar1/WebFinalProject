import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';

const routes: Routes = [
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'genre/:id', component: MovieListComponent },
  { path: 'now-playing', component: MovieListComponent },
  { path: 'popular', component: MovieListComponent },
  { path: 'top-rated', component: MovieListComponent },
  { path: 'upcoming', component: MovieListComponent },
  { path: 'favorites', component: MovieListComponent },
  { path: '', component: MovieListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
