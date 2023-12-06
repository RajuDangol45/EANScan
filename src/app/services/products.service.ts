import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductApiResponse } from '../prices/prices.page';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private url = 'https://eanscan.onrender.com';

  constructor(private http: HttpClient) {}

  public async getProductsFromEan(ean: string): Promise<ProductApiResponse[]> {
    const res = await this.http
      .get<ProductApiResponse[]>(this.url, {
        params: {
          ean,
        },
      })
      .toPromise() as ProductApiResponse[];
    return res;
  }
}
