import { Component, EventEmitter, inject, Input } from '@angular/core';
import { RecipeModel } from '../../models/recipe.model';
import { CommonModule } from '@angular/common';
import { SvgService } from '../../services/svg.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RelativeTimePipe } from '../../custom-pipe/relative-time.pipe';
import { ModalComponent } from '../modal/modal.component';
import { CommentComponent } from '../comment/comment.component';
import { RouterLink } from '@angular/router';
import { RecipeActionsComponent } from '../recipe-actions/recipe-actions.component';

@Component({
  selector: 'recipe-preview',
  imports: [CommonModule, RelativeTimePipe, ModalComponent, RouterLink],
  templateUrl: './recipe-preview.component.html',
  styleUrl: './recipe-preview.component.scss'
})
export class RecipePreviewComponent {
  @Input() recipe!: RecipeModel
  isModalOpen = false
  modalComponent: any
  modalData: any
  modalType: string = ''

  private svgService = inject(SvgService)
  private sanitizer = inject(DomSanitizer)

  icons: { [key: string]: SafeHtml } = {}

  ngOnInit(): void {
    this.loadIcons(['heart', 'comment', 'save', 'more'])
  }

  private loadIcons(iconNames: string[]): void {
    iconNames.forEach((iconName) => {
      const svgContent = this.svgService.getIcon(iconName)
      this.icons[iconName] = this.sanitizer.bypassSecurityTrustHtml(svgContent)
    })
  }

  openModal(type: string): void {
    this.isModalOpen = true
    console.log('Received modal data:', type)

    if (type === 'comments') {
      this.modalComponent = CommentComponent
      this.modalData = { comments: this.recipe.comments }
    } else if (type === 'actions') {
      this.modalComponent = RecipeActionsComponent
      this.modalData = {
        recipeId: this.recipe._id,
      }
    }
  }

  handleCloseModal(): void {
    this.isModalOpen = false
  }
}
