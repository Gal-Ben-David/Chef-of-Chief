import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SvgService } from '../../services/svg.service';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterLink],
  templateUrl: './app-footer.component.html',
  styleUrl: './app-footer.component.scss'
})
export class AppFooterComponent {

  private svgService = inject(SvgService)
  private sanitizer = inject(DomSanitizer)
  private userService = inject(UserService)
  loggedInUser$ = this.userService.loggedInUser$
  routeType: string = 'home'

  icons: { [key: string]: SafeHtml } = {}

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed())
      .subscribe((event: NavigationEnd) => {
        switch (true) {
          case event.url === '/':
            this.routeType = 'home'
            break;
          case event.url === '/edit':
            this.routeType = 'edit'
            break;
          case event.url === '/feed/123':
            this.routeType = 'feed'
            break;
          default:
            this.routeType = 'other'
            break;
        }
      })
  }

  ngOnInit(): void {
    this.loadIcons(['home', 'homeFull', 'search', 'create', 'createFull'])
  }

  private loadIcons(iconNames: string[]): void {
    iconNames.forEach((iconName) => {
      const svgContent = this.svgService.getIcon(iconName)
      this.icons[iconName] = this.sanitizer.bypassSecurityTrustHtml(svgContent)
    })
  }

}
