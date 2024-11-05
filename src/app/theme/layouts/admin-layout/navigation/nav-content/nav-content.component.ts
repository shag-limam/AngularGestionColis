// // Angular import
// import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import { CommonModule, Location, LocationStrategy } from '@angular/common';
// import { RouterModule } from '@angular/router';

// // project import
// import { NavigationItem, NavigationItems } from '../navigation';
// import { environment } from 'src/environments/environment';
// import { SharedModule } from 'src/app/theme/shared/shared.module';
// import { NavCollapseComponent } from './nav-collapse/nav-collapse.component';
// import { NavGroupComponent } from './nav-group/nav-group.component';
// import { NavItemComponent } from './nav-item/nav-item.component';

// // icon
// import { IconService } from '@ant-design/icons-angular';
// import {
//   DashboardOutline,
//   CreditCardOutline,
//   LoginOutline,
//   QuestionOutline,
//   ChromeOutline,
//   FontSizeOutline,
//   ProfileOutline,
//   BgColorsOutline,
//   AntDesignOutline
// } from '@ant-design/icons-angular/icons';

// @Component({
//   selector: 'app-nav-content',
//   standalone: true,
//   imports: [SharedModule, CommonModule, RouterModule, NavCollapseComponent, NavGroupComponent, NavItemComponent],
//   templateUrl: './nav-content.component.html',
//   styleUrls: ['./nav-content.component.scss']
// })
// export class NavContentComponent implements OnInit {
//   // public props
//   @Output() NavCollapsedMob: EventEmitter<string> = new EventEmitter();

//   navigations: NavigationItem[];

//   // version
//   title = 'pages application for version numbering';
//   currentApplicationVersion = environment.appVersion;

//   navigation = NavigationItems;
//   windowWidth = window.innerWidth;

//   // Constructor
//   constructor(
//     private location: Location,
//     private locationStrategy: LocationStrategy,
//     private iconService: IconService
//   ) {
//     this.iconService.addIcon(
//       ...[
//         DashboardOutline,
//         CreditCardOutline,
//         FontSizeOutline,
//         LoginOutline,
//         ProfileOutline,
//         BgColorsOutline,
//         AntDesignOutline,
//         ChromeOutline,
//         QuestionOutline
//       ]
//     );
//     this.navigations = NavigationItems;
//   }

//   // Life cycle events
//   ngOnInit() {
//     if (this.windowWidth < 1025) {
//       (document.querySelector('.coded-navbar') as HTMLDivElement).classList.add('menupos-static');
//     }
//   }

//   fireOutClick() {
//     let current_url = this.location.path();
//     const baseHref = this.locationStrategy.getBaseHref();
//     if (baseHref) {
//       current_url = baseHref + this.location.path();
//     }
//     const link = "a.nav-link[ href='" + current_url + "' ]";
//     const ele = document.querySelector(link);
//     if (ele !== null && ele !== undefined) {
//       const parent = ele.parentElement;
//       const up_parent = parent?.parentElement?.parentElement;
//       const last_parent = up_parent?.parentElement;
//       if (parent?.classList.contains('coded-hasmenu')) {
//         parent.classList.add('coded-trigger');
//         parent.classList.add('active');
//       } else if (up_parent?.classList.contains('coded-hasmenu')) {
//         up_parent.classList.add('coded-trigger');
//         up_parent.classList.add('active');
//       } else if (last_parent?.classList.contains('coded-hasmenu')) {
//         last_parent.classList.add('coded-trigger');
//         last_parent.classList.add('active');
//       }
//     }
//   }

//   navMob() {
//     if (this.windowWidth < 1025 && document.querySelector('app-navigation.coded-navbar').classList.contains('mob-open')) {
//       this.NavCollapsedMob.emit();
//     }
//   }
// }



import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule, Location, LocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavigationItem, NavigationItems } from '../navigation';
import { environment } from 'src/environments/environment';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NavCollapseComponent } from './nav-collapse/nav-collapse.component';
import { NavGroupComponent } from './nav-group/nav-group.component';
import { NavItemComponent } from './nav-item/nav-item.component';

@Component({
  selector: 'app-nav-content',
  standalone: true,
  imports: [SharedModule, CommonModule, RouterModule, NavCollapseComponent, NavGroupComponent, NavItemComponent],
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.scss']
})
export class NavContentComponent implements OnInit {
  @Output() NavCollapsedMob: EventEmitter<string> = new EventEmitter();
  
  navigations: NavigationItem[] = [];
  windowWidth = window.innerWidth;

  constructor(
    private location: Location,
    private locationStrategy: LocationStrategy
  ) {}

  ngOnInit() {
    const userType = localStorage.getItem('userType'); // Get user type from localStorage
    this.filterNavigationByUserType(userType); // Filter navigation based on userType

    if (this.windowWidth < 1025) {
      (document.querySelector('.coded-navbar') as HTMLDivElement).classList.add('menupos-static');
    }
  }

  filterNavigationByUserType(userType: string | null): void {
    if (!userType) {
      this.navigations = [];
      return;
    }
  
    // Filter groups and also filter their children based on userType
    this.navigations = NavigationItems.filter(item => {
      // If the item has children, filter them as well
      if (item.children) {
        item.children = item.children.filter(child => this.isVisibleForUser(child, userType));
        // Only include the group if it has visible children after filtering
        return item.children.length > 0;
      }
      return this.isVisibleForUser(item, userType);
    });
  }
  
  // Filter navigation based on the userType
  // filterNavigationByUserType(userType: string | null): void {
  //   if (!userType) {
  //     this.navigations = [];
  //     return;
  //   }

  //   this.navigations = NavigationItems.filter(item => this.isVisibleForUser(item, userType));
  // }

  // Determine if an item is visible for the current user type
  isVisibleForUser(item: NavigationItem, userType: string): boolean {
    if (item.visibleFor && item.visibleFor.length > 0) {
      return item.visibleFor.includes(userType);
    }
    return true; // If no visibleFor is specified, default to visible for all
  }

  // Handle mobile navigation toggle
  navMob() {
    if (this.windowWidth < 1025 && document.querySelector('app-navigation.coded-navbar')?.classList.contains('mob-open')) {
      this.NavCollapsedMob.emit();
    }
  }

  // Helper to manage active menu based on URL
  fireOutClick() {
    let current_url = this.location.path();
    const baseHref = this.locationStrategy.getBaseHref();
    if (baseHref) {
      current_url = baseHref + this.location.path();
    }

    const link = "a.nav-link[href='" + current_url + "']";
    const ele = document.querySelector(link);
    if (ele !== null && ele !== undefined) {
      const parent = ele.parentElement;
      const up_parent = parent?.parentElement?.parentElement;
      const last_parent = up_parent?.parentElement;

      if (parent?.classList.contains('coded-hasmenu')) {
        parent.classList.add('coded-trigger');
        parent.classList.add('active');
      } else if (up_parent?.classList.contains('coded-hasmenu')) {
        up_parent.classList.add('coded-trigger');
        up_parent.classList.add('active');
      } else if (last_parent?.classList.contains('coded-hasmenu')) {
        last_parent.classList.add('coded-trigger');
        last_parent.classList.add('active');
      }
    }
  }
}
