# Teknologi Cloud Computing 
### 08


## Docker Compose
Docker-compose adalah sebuah alat dari docker yang digunakan untuk mendefinisikan dan menjalankan aplikasi multi kontainer. Dengan docker-compose kita bisa menjalankan kontainer 1 dengan yang lainya dengan 1 perintah . Docker-compose juga menggunakan yaml file untuk menyimpan konfigurasi dari service yang dibuat.

Dengan docker compose kita bisa menyimpan konfigurasi dalam file, berarti semua perubahan dependency service, seperti versi database dan service lain dapat dimasukkan dalam VCS (Version Control System). Dengan VCS kita dapat lebih mudah men-debug jika terjadi error pada software.


## Docker Network
Untuk dapat terhubung dengan Docker Container lainnya Docker mengunakan Network untuk dapat terhubung, sama halnya dengan komputer agar bisa terhubung satu dengan komputer lainnya komputer memerlukan network begitu pula Docker konsepnya sama dengan network pada komputer tetapi network pada docker berbeda layernya :D

Seperti penjelesan diatas Docker container masing2 mempunyai IP, IP ini adalah alamat untuk menghubungi kontainer yang lain agar dapat berkomunikasi

Network pada Docker antara lain

Bridge
Host
Overlay
Macvlan


### 09

## Docker swarm 


Docker Swarm adalah Salah satu product nya docker untuk dapat mendeploy container pada multihost.
Multihost disini adalah di banyak server. Misalnya kita mempunyai 2 server, misalnya server A dan server B. Masing - masing server akan dilakukan instalasi docker, dan masing - masing docker mempunyai 1 container yang sedang berjalan. Bagaimana caranya agar container yang terdapat pada server A dan melakukan komunikasi dengan container yang ada pada server B, sedangkan jaringan yang terdapat pada server berbeda dengan jaringan yang terdapat di dalam masing - masing container. Dengan menggunakan docker swarm, dengan menggunakan docker swarm maka docker yang yang terdapat di dalam beberapa host dapat kita lakukan cluster sehingga seakan - akan docker tersebut terdapat pada 1 host. 

Dengan menggunakan docker swarm, kita bebas menetukan container tersebut ingin di deploy ke host yang diinginkan.