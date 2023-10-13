import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';
import { Observable, Subject, debounceTime, distinct, distinctUntilChanged, switchMap } from 'rxjs';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
})
export class SearchPokemonComponent implements OnInit {
  searchTerms = new Subject<string>(); // Flux de données pour le champ de recherche
  pokemons$!: Observable<Pokemon[]>; // Afficher les résultats de la recherche

  constructor(
    private router: Router,
    private pokemonService: PokemonService
    ) {}

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      // On attend un certain temps avant d'effectuer une requete pour ne pas en lancer une à chaque saisie
      debounceTime(300),
      // Ne lance pas de requêtes identiques
      distinctUntilChanged(),
      // Lancer la requete
      switchMap((term) => this.pokemonService.searchPokemonList(term))
    );
  }

  search(term: string) {
    // Pousse la saisie de l'utilisateur dans le flux (=push pour les tableaux)
    this.searchTerms.next(term);
  }

  goToDetail(pokemon: Pokemon) {
    const link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }
}
