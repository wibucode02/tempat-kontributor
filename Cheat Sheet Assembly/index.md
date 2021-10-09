<img src="https://i.pinimg.com/736x/ba/d1/d8/bad1d84bd2ad3c445cab94069805a89d.jpg">

# Cheat Sheets Assembly

### Basic Compiling

#### File :

```asm
; filename : basic.asm
  global _start
section .text
_start:
  push rbp
  mov rbp,rsp
  mov rax, 60       ; (eax = 60) = exit
  xor rdi, rdi      ; rdi = 0
  syscall           ; exit(rdi)
  ; saat ret dipanggil eax akan digunakan sebagai exit code
  ; exit code yang lebih dari 0 adalah error
  ; check /usr/include/asm-generic/errno.h
  ; atau locate errno.h pada distribusi masing masing
  pop rbp
  ret
```

#### Statically Linked :

```bash
nasm -f elf64 basic.asm
ld.lld basic.o -o basic
```

#### Dynamic Linked :

```bash
; ubah basic.asm label _start beserta global ke main
```

```bash
nasm -f elf64 basic.asm
ld.lld -m elf_x86_64 -L/usr/lib/ -dynamic-linker /lib/ld-linux-x86-64.so.2 /usr/lib/crt* -lc basic.o -o basic
# -m <arhictecture>
# -L <library path>
# -dynamic-linker <standard interpreter object>
# -lc <linked library c (glibc)>
# locate crt* karena masing masing distribusi menempatkan abi linux berbeda-beda.
```

---

### Conditional Status

Praktik pada conditional status ini menggunakan ltrace agar mengetahui exit status code, bila exit code lebih dari 0 anda harus memperbaiki code assembly dibawah.

---

- Carry Flags

Carry flags adalah kondisi disaat registers melebihi kapasitas unsigned number yang bisa ditampung.

contoh:

`al` hanya bisa menampung 0xff atau 255

[Check Size Disini](https://gist.github.com/malwareslayer/4a491a78ea69de43b828f1756495e2de#basic-mov--max-size-)

```asm
; filename : carry.asm - fixed this
global main
  section .text
fixed:
  push rbp
  mov rbp, rsp
  xor rax, rax
  pop rbp
  ret
main:
  push rbp
  mov rbp, rsp
  mov al, 255
  adc al, 2     ; add carry (adc) 2 to al
  jnc fixed     ; jump if CF=1
  pop rbp
  ret
```

<details>

  <summary>Solution</summary>

  ```asm
  15c15
  <   jnc fixed     ; jump if CF=1
  ---
  >   jc fixed      ; jump if CF=1
  ```

</details>

---

- Parity Flag

Parity Flag adalah kondisi dimana registers memiliki bilangan ganjil (paritas).

```asm
; filename : parity.asm - fix this
  global main
section .text
fixed:
  push rbp
  mov rbp, rsp
  xor rax, rax
  pop rbp
  ret
main:
  push rbp
  mov rbp, rsp
  mov al, 3
  test al, al        ; self-test registers
  jnp fixed          ; jump if PF=1
  pop rbp
  ret
```

<details>

  <summary>Solution</summary>

  ```asm
  15c15
  <   jnp fixed          ; jump if PF=1
  ---
  >   jp fixed           ; jump if PF=1
  ```

</details>

---

- Adjust Flag / Auxiliary Flag

Adjust Flag registers adalah kondisi dimana registers CF aktif dan digunakan untuk Binary Coded Decimals [BCD](https://www.osdata.com/topic/language/asm/bcdarith.htm)

---

- Zero Flag

Zero Flag adalah kondisi dimana registers bernilai 0

```asm
; filename : zero.asm - fix this
  global main
section .text
fixed:
  push rbp
  mov rbp, rsp
  xor rax, rax
  pop rbp
  ret
main:
  push rbp
  mov rbp, rsp
  mov al, 1           ; You Should Fix This
  test al, al         ; self-test registers
  jz fixed            ; jump if ZF=1
  pop rbp
  ret
```

<details>

  <summary>Solution</summary>

  ```asm
  13c13
  <   mov al, 1           ; You Should Fix This
  ---
  >   mov al, 0           ; You Should Fix This
  ```

</details>

---

- Sign Flag

Sign Flag adalah kondisi dimana registers memiliki nilai negatif

```asm
; filename : sign.asm - fix this
  global main
section .text
fixed:
  push rbp
  mov rbp, rsp
  xor rax, rax
  pop rbp
  ret
main:
  push rbp
  mov rbp, rsp
  mov al, -1
  test al, al         ; self-test registers
  jns fixed           ; jump if SF=1
  pop rbp
  ret
```

<details>

  <summary>Solution</summary>

  ```
  15c15
  <   jns fixed           ; jump if SF=1
  ---
  >   js fixed            ; jump if SF=1
  ```

</details>

---

- Trap Flag

Trap Flag adalah kondisi dimana program dijalankan secara satu persatu seperti debugger breakpoints, trap flag (breakpoints) melakukan penulisan instruksi `0xCC` setelah frame label (sebelum `push rbp`) atau address. jadi trap flag tidak mempunyai kondisional apapun melainkan hanya untuk menandai breakpoints pada frame ataupun address.

```asm
; filename : trap.asm - fix this
  global main
section .text
fixed:
  push rbp
  mov rbp, rsp
  xor rax, rax
  pop rbp
  ret
error:
  push rbp
  mov rbp, rsp
  mov rax, 60
  mov rdi, 1
  syscall
  pop rbp
  ret
main:
  ; int3
  ; instruksi int3 (0xCC) akan dituliskan bila debugger melakukan penulisan breakpoints, contoh pada gdb: break main
  ; jangan diuncoment akan terjadi infinite loop error unexpected breakpoints pada ltrace (infinite loop error cause handlers SIGTRAP not set)
  push rbp
  mov rbp, rsp
  mov eax, dword [rel main]
  and eax, 0xff
  cmp eax, 0xcc
  je fixed
  jmp error
  pop rbp
  ret
```

<details>

  <summary>Solution</summary>

  Jalankan menggunakan `gdb` dan `break main`

</details>

#### Equivalent C :

```asm
#include <stdio.h>
#include <stdlib.h>

int main(void) {
  if(((*(volatile unsigned*)main) & 0xFF) == 0xCC) {
    puts("You're Breakpoint This Frame");
  } else {
    puts("You're Not Breakpoint This Frame");
  }
}
```

---

- Interrupt Flag

Interrupt Flag adalah kondisi dimana sebuah program terminated secara paksa, sama halnya seperti `KeyboardInterrupt` pada Python. Interrupt Flag sudah otomatis dihandle oleh `ncurses`.

---

- Direction Flag

Direction Flag digunakan untuk memproses iterasi character pada address, sama seperti halnya yang digunakan [rbx](https://gist.github.com/malwareslayer/4a491a78ea69de43b828f1756495e2de#registers--mnemonics) untuk penanganan offset dan `rcx` untuk iterasi (fetching) bytes pada `.data`, `.bss`, `.rodata`

---

- Overflow Flag

Carry flags adalah kondisi disaat registers melebihi kapasitas signed number (0 sampai -128) yang bisa ditampung (kebalikan dari carry).

```asm
; filename : overflow.asm - fixed this
global main
  section .text
fixed:
  push rbp
  mov rbp, rsp
  xor rax, rax
  pop rbp
  ret
main:
  push rbp
  mov rbp, rsp
  mov al, -128
  sub al, 1      ; -128 - 1
  jno fixed      ; jump if OF=1
  pop rbp
  ret
```

<details>

  <summary>Solution</summary>

  ```asm
  15c15
  <   jno fixed      ; jump if CY=1
  ---
  >   jo fixed       ; jump if CY=1
  ```

</details>
