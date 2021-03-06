import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryItemsComponent } from './body/inventory-items/inventory-items.component';
import { InventoryComponent } from './body/inventory/inventory.component';
import { LoginComponent } from './body/login/login.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "Inventory", component: InventoryComponent },
  { path: "Inventory/Items", component: InventoryItemsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
