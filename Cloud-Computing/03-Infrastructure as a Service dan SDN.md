# Teknologi Cloud Computing 
### 04 

#### Infrastructure as a Service dan SDN
Iaas adalah layanan infrastruktur memberikan kendali penuh bagi pengguna untuk melakukan penambahan atau pengurangan resources. Selain itu, pengguna dapat dengan bebas menginstall aplikasi-aplikasi dalam VM yang dibuat.

Secara topologi pun IaaS dapat dibuat sesuai dengan kebutuhan seperti topologi network atau juga penggunaan VPN,layanan cloud yang sudah berupa bundling perangkat hardware yang berupa virtualisasi, jaringan internet, bandwitch, network dan ip publik, termasuk storage.

Cloud provider menyediakan berbagai spesifikasi seperti CPU, RAM, dan Storage dalam bentuk virtualisasi. Karena dari sisi cloud provider memiliki high-end server yang mereka bagi-bagi menjadi beberapa virtualisasi, ketika cloud provider memiliki storage 2TB dengan teknologi virtualisasi yang mereka gunakan dapat membagi menjadi 40GBx50 unit komputer virtualisasi yang bisa di gunakan oleh pengguna jadi provider cloud dapat memanfaatkan virtual virtualisasi untuk membagi storage yang besar menjadi lebih kecil dan banyak.

Elemen terpenting pada sistem cloud (sistem virtual) dimana hardware di kelola secara virtual (Virtual Machine) seperti CPU, Memory, Network, dan Storage. Masing-masing penyedia IaaS memiliki cara yang berbeda dalam menyajikan layanan tersebut ke pelanggan. Berikut elemen yang secara umum di gunakan:

* User authentication
* Hypervisor
* Virtual Network
* Storage Imaging
* Block Storage
* Swift
* Dashboard

Pelanggan dapat memesan perangkat yang dibutuhkan sesuai kapasitas melalui menu login dashboard, kemudian permintaan tersebut diteruskan oleh sistem “messaging broker” untuk berkomunikasi pada sistem virtual penyedia IaaS.

Ketika pelanggan mengeluarkan permintaan atas sebuah Virtual Machine, Hypervisor melaksanakan perintah tersebut sesuai spesifikasi CPU dan Ram yang diminta oleh pelanggan dan permintaan ruang penyimpanan dihandle oleh Block Storage. Seluruh perintah tersebut akan di cluster sebagai reserved oleh pelanggan pada sistem infrastruktur di data center.

## Fitur dan kelebihan IaaS

##### Test and Development
kita dapat melakukan testting aplikasi sebelum di upload ke production server , dengan Iaas kita  dapat melakukan testing dengan cepat untuk dappat di uji dengan fitur scale up dev-test semua bisa di lakukan dengan cepat dan mudah.
##### Webiste Hossting
Sebagai layanan Iaas tentunya kita dapat menjadikanya sebagai server webhosting yang lebih fleksibel dan hemat biaya.
##### Web Apps
dengan Iaas tentunya semua kebutuhan untuk web apps sudah di dukung seperti storage, web server dan newtwork reousrce yang dapat di gunakan ketiak ingin men scale up dan scale down applikasi setiap saat.
##### High-performance computing 
HPC seperti super komputer grid komputer atau kluster komputer dapat di terapkan pada layanan Iaas dengan adanya HPC kita dapat melakukan simulasi cuaca, gempa, dan lain-lain
##### Big data analysis
Iaas juga dapat di gunakan sabai infrastruktur untuk melakukan analisis bigdata.

## Software Defined Networking (SDN)
SDN atau Software Defined Network adalah teknologi yang memisahkan antara data plane dengan control plane pada perangkat jaringan. dengan menggunakan SDN kita dapat menghandle semua perangkat seperti router,swtich hanya dengan satu perangkat saja perangkat ini lah yang nantinya kita kenal dengan istilah controller, Jadi controller ini merupakan pusat konfigurasi dari semua perangkat dalam SDN atau bisa dikatakan kontrol pusat dimana setiap perangkat di konfigurasi secara langsung atau terpusat, semua perangkat tersebut bisa terhubung ke controller dengan menggunakan sebuah protokol yang kita kenal dengan openflow bila kita aktifkan maka secara otomatis akan memisahkan antara data plane dengan control plane, dan agar controller bisa terhubung ke setiap perangkat syaratnya perangkat tersebut harus sudah support openflow, berarti akan  bertambah lagi kata kunci kita ada SDN, controller, Openflow merupakan bagian atau komponen dalam membangun SDN.

Arsitektur Software Defined Networking:

* Aplication Layer
* Controller Layer
* Infrastruktur Layer