import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Router } from '@angular/router';
import { ProductId } from 'src/app/Interface/ProductInterface';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend.service';
import { ToastService } from 'src/app/services/toast-service.service';


@Component({
  selector: 'app-inventory-items',
  templateUrl: './inventory-items.component.html',
  styleUrls: ['./inventory-items.component.css']
})
export class InventoryItemsComponent implements OnInit {

  itemCollection: string
  constructor(public backendService: BackendService, public authService: AuthService, public router: Router, public functions: AngularFireFunctions, public toastService: ToastService) { }
  enableLoader: Boolean = true

  ngOnInit(): void {
      this.backendService.readProductData()
  }

  modifyProduct(item: ProductId) {
    this.createNewProduct(item)
  }

  async createNewProduct(product: ProductId) {
    const callable = this.functions.httpsCallable('createNewProduct');
    try {
      const result = await callable({ Mode: "Modify", ProductId: product.Id, Name: product.Name, Description: product.Description, Availability: product.Availability, ActualPrice: product.ActualPrice, DiscountPrice: product.DiscountPrice }).toPromise();
      this.toastService.show('Successfully Modified the Product', { classname: 'bg-success text-light' });

      console.log(result);
    } catch (error) {
    }
  }
}
