import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../movie-card/movie-card.model';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {
  @Input() movie: Movie ={
    title: '',
    overview: '',
    poster_path: '',
    id:0
  };
  constructor() { }

  ngOnInit(): void {
  }

 

}
