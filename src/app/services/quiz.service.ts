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
      { id: '/assets/data/2m.json', name: '2 Meses' },
      { id: '/assets/data/4m.json', name: '4 Meses' },
      { id: '/assets/data/6m.json', name: '6 Meses' },
      { id: '/assets/data/9m.json', name: '9 Meses' },
      { id: '/assets/data/1y.json', name: '1 año' },
      { id: '/assets/data/18m.json', name: '18 Meses' },
      { id: '/assets/data/2y.json', name: '2 años' },
      { id: '/assets/data/3y.json', name: '3 años' },
      { id: '/assets/data/4y.json', name: '4 años' },
      { id: '/assets/data/5y.json', name: '5 años' },
    ];
  }
}
