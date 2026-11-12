import { Routes } from '@angular/router';
import { RecordsPage } from './records-page';
export const routes: Routes = [{path:'',pathMatch:'full',redirectTo:'topics'},...(['topics','labs','resources'] as const).map(kind=>({path:kind,component:RecordsPage,data:{kind}})),{path:'**',redirectTo:'topics'}];
