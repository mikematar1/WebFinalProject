import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Genre } from '../genre-list/genre.model'; 

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  genres: Genre[] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getGenres().subscribe((data: any) => {
      this.genres = data.genres;
    });
  }
}
