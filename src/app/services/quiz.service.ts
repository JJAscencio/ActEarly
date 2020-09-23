import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  get(url: string) {
    return this.http.get(url);
  }

  getAll() {
    return [
      { id: '/assets/data/m2.json', name: '2 Meses' },
      { id: '/assets/data/m4.json', name: '4 Meses' },
      { id: '/assets/data/m6.json', name: '6 Meses' },
      { id: '/assets/data/m9.json', name: '9 Meses' },
      { id: '/assets/data/y1.json', name: '1 año' },
      { id: '/assets/data/m18.json', name: '18 Meses' },
      { id: '/assets/data/y2.json', name: '2 años' },
      { id: '/assets/data/y3.json', name: '3 años' },
      { id: '/assets/data/y4.json', name: '4 años' },
      { id: '/assets/data/y5.json', name: '5 años' },
    ];
  }
}
