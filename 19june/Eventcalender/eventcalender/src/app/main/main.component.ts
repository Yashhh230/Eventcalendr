import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

import { SidebarService } from '../shared/services/sidebar.service';
import { HeaderComponent } from 'src/app/layout/header/header.component';
import { FooterComponent } from 'src/app/layout/footer/footer.component';
import { SidebarComponent } from 'src/app/layout/sidebar/sidebar.component';
import { PageComponent } from '../layout/page/page.component';
import { AddEditComponent } from '../shared/add-edit/add-edit.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule , RouterModule , HeaderComponent , FooterComponent , SidebarComponent , PageComponent , AddEditComponent ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  sidebarVisible:boolean = true;

  constructor(private sidebarService: SidebarService) {
    this.sidebarService.getSidebarState().subscribe(visible => {
      this.sidebarVisible = visible;
    });
  }
}
