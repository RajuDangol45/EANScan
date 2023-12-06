import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

// separate to interface files
interface Product {
  name: string;
  price: number;
  date: string;
  companySign: string;
  companyName: string;
}

export interface ProductApiResponse {
  Name: string;
  Price: number;
  Date: string;
  company_sign: string;
  company_name: string;
}

@Component({
  selector: 'app-prices',
  templateUrl: './prices.page.html',
  styleUrls: ['./prices.page.scss'],
})
export class PricesPage implements OnInit {
  public productName = '';
  public productListings: Product[] = [];

  constructor(private productsService: ProductsService, private loadingCtrl: LoadingController, private route: ActivatedRoute) { }

  ngOnInit() {
    const ean = this.route.snapshot.queryParamMap.get('ean');
    if (ean) {
    this.getProductList(ean);
      
    }
  }

  async getProductList(ean: string) {
    const loading = await this.loadingCtrl.create({message: 'Fetching products'});
    loading.present();
    this.productsService.getProductsFromEan(ean).then((res: ProductApiResponse[]) => {
      this.productListings = res.map(mapProductParams);
      this.productName = (this.productListings && this.productListings[0] && this.productListings[0].name);
      loading.dismiss();
    }).catch(() => loading.dismiss());
  }
}

// separate to map files
const mapProductParams = (apiResponse: ProductApiResponse): Product => {
  return {
    name: apiResponse.Name,
    price: apiResponse.Price,
    date: apiResponse.Date,
    companySign: apiResponse.company_sign,
    companyName: apiResponse.company_name
  } as Product
}