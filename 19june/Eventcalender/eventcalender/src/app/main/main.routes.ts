import { Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { DashboardviewComponent } from './dashboardview/dashboardview.component';
import { TableviewComponent } from './tableview/tableview.component';
import { CalenderviewComponent } from './calenderview/calenderview.component';
// import { CalenderviewComponent } from './calenderview/calenderview.component';
// import { MailistComponent } from './mailist/mailist.component';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                pathMatch: "full",
                redirectTo:"dashboard"
            },
            {
                path: 'dashboard',
                component: DashboardviewComponent
            },
            {
                path: 'table',
                component:TableviewComponent
            },
            {
                path: 'calender',
                component:CalenderviewComponent
            }
        ]
    }
];