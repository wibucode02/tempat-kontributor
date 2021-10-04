* membuat aplikasi sederhana untuk menghitung index nilai berdasarkan nilai UTS, UAS, dan TUBES nya
* terdapat 6 fungsi yang dibuat
  ```
    void main_menu();
    void set_standar();
    void set_proporsi_nilai();
    char hitung_index(double uts, double uas, double tubes);
    void input_nilai();
    void thank_you();
  ```
* void main_menu()
    - fungsi berisi pilihan menu di dalam aplikasi:
      daftar menu:
      1. set standar index nilai
      2. set proporsi nilai
      3. input nilai
      4. keluar
    - fungsi meminta input pilihan menu dari user
      dan memanggil fungsi menu yang dipilih

* void set_standar();
    - fungsi mengubah standar index A, B, C, D, dan E
    - fungsi akan menerima input rentang nilai untuk masing-masing index nilai
    - fungsi akan mengulang menerima input dari user jika terdapat nilai yang overlap
    
* void set_proporsi_nilai();
    - fungsi mengubah prosentase nilai UTS, UAS, dan TUBES
    - fungsi akan menerima 3 input prosentase dari user untuk UTS, UAS, dan TUBES
    - fungsi akan mengulang menerima input dari user jika total prosentase != 100
    
* char hitung_index(double uts, double uas, double tubes);
    - fungsi menghitung total nilai berdasarkan input parameter dan proporsi nilai
    - fungsi menentukan index nilai berdasarkan standar nilai
    - fungsi mengembalikan karakter index nilai

* void input_nilai();
    - fungsi menerima input nilai UTS, UAS, dan TUBES
    - fungsi menampilkan index yang didapat berdasarkan input nilai UTS, UAS, dan TUBES

* void thank_you();
    - fungsi menampilkan pesan singkat untuk mengakhiri program

