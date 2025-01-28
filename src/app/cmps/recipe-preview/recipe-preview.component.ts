import { Component, inject, Input } from '@angular/core';
import { RecipeModel } from '../../models/recipe.model';
import { CommonModule } from '@angular/common';
import { SvgService } from '../../services/svg.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RelativeTimePipe } from '../../custom-pipe/relative-time.pipe';

@Component({
  selector: 'recipe-preview',
  imports: [CommonModule, RelativeTimePipe],
  templateUrl: './recipe-preview.component.html',
  styleUrl: './recipe-preview.component.scss'
})
export class RecipePreviewComponent {
  @Input() recipe!: RecipeModel

  private svgService = inject(SvgService)
  private sanitizer = inject(DomSanitizer)

  icons: { [key: string]: SafeHtml } = {}

  ngOnInit(): void {
    this.loadIcons(['heart', 'comment', 'save'])
  }

  private loadIcons(iconNames: string[]): void {
    iconNames.forEach((iconName) => {
      const svgContent = this.svgService.getIcon(iconName)
      this.icons[iconName] = this.sanitizer.bypassSecurityTrustHtml(svgContent)
    })
  }
}
