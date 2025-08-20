import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MovieApi } from '../../services/movie-api';


@Component({
  selector: 'app-person-detail',
  standalone:true,
  imports: [CommonModule, RouterModule],
  templateUrl: './person-detail.html',
  styleUrl: './person-detail.css'
})
export class PersonDetail implements OnInit {
 person: any; // <-- Bu satırı ekleyin

    constructor(
        private route: ActivatedRoute,
        private movieApi: MovieApi
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.movieApi.getPersonDetails(+id).subscribe((response:any) => {
                this.person = response;
            });
        }
    }
}
