import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../../shared/services/security.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    public showMenu: string;
    role: number;

    constructor(private securityService: SecurityService) {}

    ngOnInit() {
        this.showMenu = '';
        let data: {};
        data = this.securityService.getDecodeToken();
        this.role = data['user'].role;
        // console.log('Role: ' + this.role);
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }
}
