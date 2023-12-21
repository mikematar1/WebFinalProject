import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Genre } from '../genre-list/genre.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  genres: Genre[] = [];

  constructor(private movieService: MovieService,private router:Router) { }

  ngOnInit(): void {
    this.movieService.getGenres().subscribe((data: any) => {
      this.genres = data.genres;
    });
  }
  navigateToGenreFilter(genreid:any){
    this.router.navigate(['genre',genreid]);
  }
}
