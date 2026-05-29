<div align=center>
<img width="1311" height="97" alt="banner" src="https://github.com/user-attachments/assets/3c377aee-6adf-42dc-a287-8d82499a98d3" />
  
```mermaid
mindmap
root)Larping(
 )if(
  )Thinkpad(
   {{Gentoo}}
   Mint
 )else(
  )Hardware(     
   GPU : Intel 3rd Gen Core @ 1.10 GHz
   CPU : i3-3120M @ 2.50 GHz
   RAM : 8GB
   SATA-SSD : ~447GB usable 
  )Software(
   )2 Environments(
    )Cinnamon( 
     Muffin X11
     Cinnamon 6.6.8C850-1K3
    )Hyprland(
     Hyprland 0.55.2-Wayland
     sddm 0.21.0-Wayland
   CachyOS x86_64
   fish 4.7.1
   Linux 6.18.32-1-cachyos-lts
 )elif(
  )Desktop(
   )Windows(
    Windows 7
    Windows XP
    Windows Vista
    Windows 10
   )Linux(
    GrapheneOS
    )Distros(
     )Arch(
      Endeavour
      Vanilla
      Cachy
      Manjaro
     {{Debian}}
      Kali
     {{Ubuntu}}
      Mint
     Fedora
     )Debian derivative(
      ParrotOS
      TailsOS
  )DEs(
   Xfce
   )custom dots(
    Hyprland
    KDE Plasma
   )GTK with(
    Cinnamon
    Gnome
    MATE
```

```bash
# The string containing the whole alphabet
alphabet = "abcdefghijklmnopqrstuvwxyz"

# Loop 3 times to trigger the statements one by one
for step in range(3):
    
    # IF statement
    if step == 0:
        # i=8, f=5, =, f=5, u=20, t=19, u=20, r=17, e=4
        print(alphabet[8] + alphabet[5] + "=" + alphabet[5] + alphabet[20] + alphabet[19] + alphabet[20] + alphabet[17] + alphabet[4])
        
    # ELIF statement
    elif step == 1:
        # e=4, l=11, i=8, f=5, =, p=15, a=0, s=18, t=19
        print(alphabet[4] + alphabet[11] + alphabet[8] + alphabet[5] + "=" + alphabet[15] + alphabet[0] + alphabet[18] + alphabet[19])
        
    # ELSE statement
    else:
        # e=4, l=11, s=18, e=4, =, p=15, r=17, e=4, s=18, e=4, n=13, t=19
        print(alphabet[4] + alphabet[11] + alphabet[18] + alphabet[4] + "=" + alphabet[15] + alphabet[17] + alphabet[4] + alphabet[18] + alphabet[4] + alphabet[13] + alphabet[19])
```
