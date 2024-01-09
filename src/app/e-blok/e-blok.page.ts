import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ToastController,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiserviceService } from '../ApiService';

@Component({
  selector: 'app-e-blok',
  templateUrl: './e-blok.page.html',
  styleUrls: ['./e-blok.page.scss'],
})
export class EBlokPage implements OnInit {
  public Data: any;
  public kd_blok: any;
  public no_blok: string = '';
  public nama_blok: string = '';
  public status: string = '';

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private storage: Storage,
    private _apiService: ApiserviceService
  ) {
    this.route.queryParams.subscribe((params) => {
      const kd_blok = params['kd_blok'];
      if (kd_blok == null) {
        this.presentToast(
          'No Parameter found!',
          'warning',
          'alert-circle-outline'
        );
      } else {
        this.kd_blok = kd_blok;
        this.getBlok();
      }
    });
  }

  async presentToast(msg: any, color: any, icon: any) {
    const toast = await this.toastCtrl.create({
      icon: icon,
      message: msg,
      duration: 1500,
      color: color,
      position: 'top',
    });
    toast.present();
  }

  async getBlok() {
    try {
      await this.storage.create();
      const res = await this._apiService.getBlok();

      if (res.msg === 'ok') {
        this.Data = res.data.filter(
          (item: any) => item.kd_blok === this.kd_blok
        );
        if (this.Data.length > 0) {
          const dataItem = this.Data[0];
          this.no_blok = dataItem.no_blok;
          this.nama_blok = dataItem.nama_blok;
          this.status = dataItem.status;
        } else {
          this.presentToast(
            'Data not found',
            'warning',
            'alert-circle-outline'
          );
        }
      } else if (res.msg === 'err') {
        this.presentToast(
          'Something went wrong: ' + String(res.err),
          'danger',
          'alert-circle-outline'
        );
      }
    } catch (error) {
      console.error('Error in getInfo', error);
      this.presentToast(
        'Error fetching data',
        'danger',
        'alert-circle-outline'
      );
    }
  }

  async updateBlok() {
    try {
      if (this.no_blok === '' || this.nama_blok === '' || this.status === '') {
        this.presentToast(
          'Tidak boleh ada form yang kosong, harap isi semua form!',
          'warning',
          'alert-circle-outline'
        );
      } else {
        const loader = await this.loadingCtrl.create({
          message: 'Please wait...',
          spinner: 'lines',
        });
        loader.present();

        const updateData = {
          no_blok: this.no_blok,
          nama_blok: this.nama_blok,
          status: this.status,
        };

        const res = await this._apiService.updateBlok(updateData, this.kd_blok);

        if (res.msg === 'ok') {
          this.loadingCtrl.dismiss();
          this.presentToast(
            'Data berhasil diubah !',
            'success',
            'checkmark-circle-outline'
          );

          // Update data lokal
          const updatedDataItem = this.Data[0];
          updatedDataItem.no_blok = this.no_blok;
          updatedDataItem.nama_blok = this.nama_blok;
          updatedDataItem.status = this.status;

          this.navCtrl.navigateRoot('/blok');
        } else if (res.msg === 'notOk') {
          this.loadingCtrl.dismiss();
          this.presentToast(
            'Data gagal diubah !',
            'danger',
            'alert-circle-outline'
          );
        } else if (res.msg === 'err') {
          this.loadingCtrl.dismiss();
          this.presentToast(
            'Something went wrong !',
            'danger',
            'alert-circle-outline'
          );
        }
      }
    } catch (error) {
      console.error('Error in updateBlok', error);
      this.loadingCtrl.dismiss();
      this.presentToast(
        'Error updating data',
        'danger',
        'alert-circle-outline'
      );
    }
  }

  backToBlok() {
    // Ganti 'blok' dengan path yang sesuai untuk halaman blok Anda
    this.navCtrl.navigateForward('/blok');
  }

  ngOnInit() {}
}
