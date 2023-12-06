import { Injectable } from '@angular/core';

import { Plugins } from "@capacitor/core";
const { VSBarcodeReader } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class ScannerService {
  constructor() { }

  async scanBarcode(options?: any): Promise<any>  {
    return new Promise((resolve, reject)=> {
      options = options || {prompt: "Placez le code barre dans le cadre",
        promptCancel: "Annuler",
        frameScan: true,
        torchOn: false,
        showTorchButton: true};
      VSBarcodeReader['scan'](options).then((result: any) => {
        if (result.cancelled) {
          reject(result);
        } else {
          resolve(resolve(result.barcodeList[0].text));
        }
      }, (err: any) => {
        reject(err);
      });
    });

  }
}
