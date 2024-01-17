import { Injectable } from '@angular/core';
import axios, { AxiosResponse, AxiosError } from 'axios'; // Import AxiosResponse dan AxiosError

import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class ApiserviceService {
  public uriApi: string = 'https://greenland-foresthill.id/rest-api/index.php/';
  public fotoApi: string = 'https://greenland-foresthill.id/rest-api/';

  constructor(private storage: Storage) {}

  async login(username: string, password: string) {
    console.log(username && password);
    try {
      let url =
        this.uriApi + 'login?username=' + username + '&password=' + password;
      const res = await axios.get(url);
      if (res.data.status == 'Ok') {
        let data = res.data.result[0];
        const storage = await this.storage.create();
        storage.set('isLoggedIn', data.nik);
        localStorage.setItem('isLoggedIn', data.nik);
        return 'success';
      } else {
        return 'notFound';
      }
    } catch (err: any) {
      console.log(err);
      if (err.response.data.message == 'User not found!') {
        return 'notFound';
      } else {
        return 'err';
      }
    }
  }
  // Penduduk
  async getPenduduk(nik: string) {
    try {
      var url = '';
      if (nik == undefined || nik == '') {
        url = this.uriApi + 'Penduduk';
        const res: AxiosResponse = await axios.get(url);
        console.log(res);
        let data = res.data.result;
        return {
          msg: 'ok',
          data: data,
        };
      } else {
        url = this.uriApi + 'Penduduk?kd_pnddk=' + nik;
        const res: AxiosResponse = await axios.get(url);
        let data = res.data.result;
        return {
          msg: 'ok',
          data: data[0],
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  async getWarga() {
    try {
      let url = this.uriApi + 'Penduduk';
      // if (kd) {
      //     url += `?kd=${kd}`;
      // }

      const res: AxiosResponse = await axios.get(url);

      let data = res.data.result;
      return {
        msg: 'ok',
        data: data,
      };
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  async createPenduduk(data: any) {
    try {
      let url = this.uriApi + 'penduduk';

      const res = await axios.post(url, data);
      if (res.data.status == 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      console.log(err);
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  async update_Penduduk(data: any) {
    try {
      let url = this.uriApi + 'Update_penduduk'; // Ensure this matches your server-side endpoint
      const res: AxiosResponse = await axios.post(url, data);
      if (res.data.status == 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  async delete_Penduduk(kd_penduduk: string) {
    try {
      let url = this.uriApi + 'delete_penduduk';
      const res: AxiosResponse = await axios.post(url, {
        kd_penduduk: kd_penduduk,
      });

      if (res.data.status === 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }

  // Info
  async getInfo() {
    try {
      let url = this.uriApi + 'info';
      const res: AxiosResponse = await axios.get(url); // Tentukan tipe AxiosResponse
      let data = res.data.result;
      console.log(data);
      return {
        msg: 'ok',
        data: data,
      };
    } catch (err: any) {
      console.log(err);
      if (
        axios.isAxiosError(err) &&
        err.response &&
        err.response.data &&
        err.response.data.status == 'Err'
      ) {
        return {
          msg: 'notFound',
        };
      } else {
        return {
          msg: 'err',
          err: err,
        };
      }
    }
  }
  async createInfo(data: any) {
    try {
      let url = this.uriApi + 'info';

      const res = await axios.post(url, data);

      if (res.data.status == 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      console.log(err);
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  async updateInfo(data: any, kd: string) {
    try {
      let url = this.uriApi + 'update_info';
      const res: AxiosResponse = await axios.post(url, {
        kd: kd,
        judul_info: data.judul_info,
        informasi: data.informasi,
        tgl_info: data.tgl_info,
      });

      if (res.data.status === 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  async deleteInfo(kd_info: string) {
    try {
      let url = this.uriApi + 'delete_info';
      const res: AxiosResponse = await axios.post(url, {
        kd_info: kd_info,
      });

      if (res.data.status === 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }

  // Blok
  async getBlok() {
    try {
      let url = this.uriApi + 'blok';
      // if (kd) {
      //     url += `?kd=${kd}`;
      // }

      const res: AxiosResponse = await axios.get(url);

      let data = res.data.result;
      return {
        msg: 'ok',
        data: data,
      };
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  async createBlok(data: any) {
    try {
      let url = this.uriApi + 'blok';

      const res = await axios.post(url, data);

      if (res.data.status == 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      console.log(err);
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  async updateBlok(data: any, kd_blok: string) {
    try {
      let url = this.uriApi + 'update_blok';
      const res: AxiosResponse = await axios.post(url, {
        kd_blok: kd_blok,
        no_blok: data.no_blok,
        nama_blok: data.nama_blok,
        status: data.status,
      });

      if (res.data.status === 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }

  async deleteBlok(kd_blok: string) {
    try {
      let url = this.uriApi + 'delete_blok';
      const res: AxiosResponse = await axios.post(url, {
        kd_blok: kd_blok,
      });

      if (res.data.status === 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }

  // Iuran
  async getIuran() {
    try {
      let url = this.uriApi + 'iuran';

      // // Build query parameters based on provided values
      // const queryParams: string[] = [];
      // if (kd) queryParams.push(`kd=${kd}`);
      // if (tahun) queryParams.push(`thn=${tahun}`);
      // if (bulan) queryParams.push(`bln=${bulan}`);
      // if (jenis) queryParams.push(`jenis=${jenis}`);

      // // Append query parameters to the URL
      // if (queryParams.length > 0) {
      //     url += '?' + queryParams.join('&');
      // }

      const res: AxiosResponse = await axios.get(url);
      let data = res.data.result;
      data.bukti_iuran = this.fotoApi + 'uploads/iuran/' + data.bukti_iuran;
      return {
        msg: 'ok',
        data: data,
      };
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  async createIuran(data: any) {
    try {
      let url = this.uriApi + 'iuran';

      const res = await axios.post(url, data);

      if (res.data.status == 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      console.log(err);
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  async updateIuran(data: any) {
    try {
      let url = this.uriApi + 'Update_iuran'; // Ensure this matches your server-side endpoint
      const res: AxiosResponse = await axios.post(url, data);
      if (res.data.status == 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  async deleteIuran(kd_iuran: string) {
    try {
      let url = this.uriApi + 'delete_iuran';
      const res: AxiosResponse = await axios.post(url, {
        kd_iuran: kd_iuran,
      });

      if (res.data.status === 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }

  // Pesan
  async getPesan() {
    try {
      let url = this.uriApi + 'Pesan';

      const res: AxiosResponse = await axios.get(url);

      let data = res.data.result;
      return {
        msg: 'ok',
        data: data,
      };
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }

  async createPesan(data: any) {
    try {
      let url = this.uriApi + 'Pesan';

      const res = await axios.post(url, data);

      if (res.data.status == 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      console.log(err);
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  async updatePesan(data: any, kd_pesan: string) {
    try {
      let url = this.uriApi + 'Update_pesan';
      const res: AxiosResponse = await axios.post(url, {
        kd_pesan: kd_pesan,
        kd_penduduk: data.kd_penduduk,
        pesan: data.pesan,
        tgl_pesan: data.tgl_pesan,
      });

      if (res.data.status === 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  async deletePesan(kd_pesan: string) {
    try {
      let url = this.uriApi + 'delete_pesan';
      const res: AxiosResponse = await axios.post(url, {
        kd_pesan: kd_pesan,
      });

      if (res.data.status === 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }

  // Surat
  async getSurat() {
    try {
      let url = this.uriApi + 'Surat_keluar';

      // Tambahkan kd ke URL jika diberikan

      const res: AxiosResponse = await axios.get(url);
      let data = res.data.result;
      console.log(data);

      return {
        msg: 'ok',
        data: data,
      };
    } catch (err: any) {
      console.log(err);

      if (
        axios.isAxiosError(err) &&
        err.response &&
        err.response.data &&
        err.response.data.status == 'Err'
      ) {
        return {
          msg: 'notFound',
        };
      } else {
        return {
          msg: 'err',
          err: err,
        };
      }
    }
  }
  async createSurat(data: any) {
    try {
      let url = this.uriApi + 'Surat_keluar';

      const res = await axios.post(url, data);
      if (res.data.status == 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      console.log(err);
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  async updateSurat(data: any, kd_surat_keluar: string) {
    try {
      let url = this.uriApi + 'Update_surat'; // Ensure this matches your server-side endpoint
      const res: AxiosResponse = await axios.post(url, {
        kd_surat_keluar: kd_surat_keluar,
        kd_penduduk: data.kd_penduduk,
        nomor_surat: data.nomor_surat,
        keterangan: data.keterangan,
        tanggal_surat: data.tanggal_surat,
      });
      if (res.data.status == 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  async deleteSurat(kd_surat_keluar: string) {
    try {
      let url = this.uriApi + 'delete_surat';
      const res: AxiosResponse = await axios.post(url, {
        kd_surat_keluar: kd_surat_keluar,
      });

      if (res.data.status === 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }

  // User
  async getUser(kd_penduduk: string) {
    try {
      var url = '';
      if (kd_penduduk == '') {
        url = this.uriApi + 'User';
      } else {
        url = this.uriApi + 'User?kd_penduduk=' + kd_penduduk;
      }

      const res: AxiosResponse = await axios.get(url);

      let data = res.data.result;
      return {
        msg: 'ok',
        data: data,
      };
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  async createUser(data: any) {
    try {
      let url = this.uriApi + 'User';

      const res = await axios.post(url, data);
      if (res.data.status == 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      console.log(err);
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  async updateUser(data: any) {
    try {
      let url = this.uriApi + 'update_user'; // Ensure this matches your server-side endpoint
      const res: AxiosResponse = await axios.post(url, data);
      if (res.data.status == 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }

  async deleteUser(kd_user: string) {
    try {
      let url = this.uriApi + 'delete_user';
      const res: AxiosResponse = await axios.post(url, {
        kd_user: kd_user,
      });

      if (res.data.status === 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }

  // Pengeluaran
  async getPengeluaran() {
    try {
      let url = this.uriApi + 'Pengeluaran';

      // Tambahkan kd ke URL jika diberikan

      const res: AxiosResponse = await axios.get(url);
      let data = res.data.result;
      console.log(data);

      return {
        msg: 'ok',
        data: data,
      };
    } catch (err: any) {
      console.log(err);

      if (
        axios.isAxiosError(err) &&
        err.response &&
        err.response.data &&
        err.response.data.status == 'Err'
      ) {
        return {
          msg: 'notFound',
        };
      } else {
        return {
          msg: 'err',
          err: err,
        };
      }
    }
  }
  async createPengeluaran(data: any) {
    try {
      let url = this.uriApi + 'Pengeluaran';

      const res = await axios.post(url, data);
      if (res.data.status == 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      console.log(err);
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  async updatePengeluaran(data: any, kd_pengeluaran: string) {
    try {
      let url = this.uriApi + 'Update_pengeluaran'; // Ensure this matches your server-side endpoint
      const res: AxiosResponse = await axios.post(url, {
        kd_pengeluaran: kd_pengeluaran,
        nama_pengeluaran: data.nama_pengeluaran,
      });
      if (res.data.status == 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  async deletePengeluaran(kd_pengeluaran: string) {
    try {
      let url = this.uriApi + 'delete_pengeluaran';
      const res: AxiosResponse = await axios.post(url, {
        kd_pengeluaran: kd_pengeluaran,
      });

      if (res.data.status === 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }

  //Uang Keluar
  async getUang() {
    try {
      let url = this.uriApi + 'Uang_keluar';

      // Tambahkan kd ke URL jika diberikan

      const res: AxiosResponse = await axios.get(url);

      let data = res.data.result;
      console.log(data);
      data.bukti = this.fotoApi + 'uploads/uangPengeluaran/' + data.bukti;

      return {
        msg: 'ok',
        data: data,
      };
    } catch (err: any) {
      console.log(err);

      if (
        axios.isAxiosError(err) &&
        err.response &&
        err.response.data &&
        err.response.data.status == 'Err'
      ) {
        return {
          msg: 'notFound',
        };
      } else {
        return {
          msg: 'err',
          err: err,
        };
      }
    }
  }

  async createUang(data: any) {
    try {
      let url = this.uriApi + 'Uang_keluar';

      const res = await axios.post(url, data);

      if (res.data.status == 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      console.log(err);
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  async updateUang(data: any) {
    try {
      let url = this.uriApi + 'Update_uang'; // Ensure this matches your server-side endpoint
      const res: AxiosResponse = await axios.post(url, data);
      if (res.data.status == 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }

  async Delete_uang(kd_keluar: string) {
    try {
      let url = this.uriApi + 'Delete_uang';
      const res: AxiosResponse = await axios.post(url, {
        kd_keluar: kd_keluar,
      });

      if (res.data.status === 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }
}
