import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SvgService } from '../../services/svg.service';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './app-footer.component.html',
  styleUrl: './app-footer.component.scss'
})
export class AppFooterComponent {

  private svgService = inject(SvgService)
  private sanitizer = inject(DomSanitizer)
  private userService = inject(UserService)
  loggedInUser$ = this.userService.loggedInUser$

  icons: { [key: string]: SafeHtml } = {}

  ngOnInit(): void {
    this.loadIcons(['home', 'search', 'add'])
  }

  private loadIcons(iconNames: string[]): void {
    iconNames.forEach((iconName) => {
      const svgContent = this.svgService.getIcon(iconName)
      this.icons[iconName] = this.sanitizer.bypassSecurityTrustHtml(svgContent)
    })
  }

}
