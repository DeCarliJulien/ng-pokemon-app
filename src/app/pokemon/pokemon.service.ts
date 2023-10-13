import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable(
  /* {
    providedIn: 'root' // Fournit notre service à l'ensemble de l 'application via root
  }*/
)
export class PokemonService {

  constructor(private http: HttpClient) {}

  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
      tap((response) => this.log(response)), // tap () = console.Log pour un Observable
      catchError((error) => this.handleError(error, []))
    );
  }
  
  getPokemonById(pokemonId: number): Observable<Pokemon|undefined> {
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => console.log(response)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  updatePokemon(pokemon: Pokemon): Observable<null> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
      );
    }

    addPokemon(pokemon: Pokemon): Observable<Pokemon> {
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      return this.http.post<Pokemon>('api/pokemons', pokemon, httpOptions).pipe(
        tap((response) => this.log(response)),
        catchError((error) => this.handleError(error, null))
      )
    }
    
  deletePokemonById(pokemonId: number): Observable<null> {
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => console.log(response)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  searchPokemonList(term: string): Observable<Pokemon[]> {
    // On ne lance pas la recherche si l'utilisateur n'a pas saisi au moins 2 lettres
    if(term.length <= 1 ) {
      return of([]);
    }

    return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
      tap((response) => this.log(response)),
        catchError((error) => this.handleError(error, []))
    );
  }

  private log(response: any) {
    console.table(response);
  }
  
  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue); // of : transforme une donnée en flux
  }
  getPokemonTypeList(): string[] {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Fée',
      'Vol',
      'Combat',
      'Psy'
    ];
  }

}