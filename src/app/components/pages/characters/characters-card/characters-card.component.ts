import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from '@app/shared/components/header/header.component';
import { Character } from '@app/shared/interfaces/data.interface';

@Component({
  selector: 'app-characters-card',
  templateUrl: './characters-card.component.html',
  styleUrls: ['./characters-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersCardComponent {

  @Input() character: Character | any;
  
  getIcon(): string {
    return this.character.isFavorite ? 'heart-solid.svg' : 'heart.svg';
  }

  toggleFavorite(): void {

    const isFavorite = this.character.isFavorite;
    this.getIcon();
    this.character.isFavorite = !isFavorite;
    

  }


}
