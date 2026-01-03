# Ayascell Browser - Kurulum ve Kullanım Rehberi

Ayascell Software için geliştirilen, modern tasarımlı ve Chrome tabanlı (Electron) web tarayıcısı.

## Özellikler
- **Tasarım:** Siyah/Antrasit arka plan ve Altın (#D4AF37) detaylar.
- **Teknoloji:** Electron, React, Vite.
- **Fonksiyonlar:** Çerçevesiz pencere, sekme sistemi, Google entegreli adres çubuğu.

---

## Windows Bilgisayarda Kurulum (.exe Oluşturma)

Bu projeyi bir Windows bilgisayarda `.exe` (uygulama) haline getirmek için aşağıdaki adımları uygulayın.

### 1. Hazırlık (Gerekli Programların Kurulumu)
Windows bilgisayarınızda **PowerShell**'i yönetici olarak açın (Başlat menüsüne PowerShell yazın, sağ tıklayıp "Yönetici olarak çalıştır" deyin) ve şu komutu yapıştırıp Enter'a basın:

```powershell
winget install -e --id OpenJS.NodeJS.LTS --source winget; winget install -e --id Git.Git --source winget; winget install -e --id Microsoft.VisualStudioCode --source winget
```

*(Bu komut Node.js, Git ve VS Code programlarını otomatik kuracaktır. Kurulum sırasında onay isterse `Y` tuşuna basıp Enter yapın.)*

### 2. Uygulamanın Oluşturulması
1. Bu proje klasörünü (`browser` klasörünü) Windows bilgisayarınıza kopyalayın.
2. Klasörün içine girin.
3. Boş bir yere sağ tıklayıp **"Open in Terminal"** (veya Powershell/CMD) seçeneğine tıklayın.
4. Açılan siyah pencereye sırasıyla şu komutları yazın:

```bash
npm install
```
*(İnternet hızınıza göre 1-2 dakika sürebilir, bitmesini bekleyin)*

```bash
npm run electron:build
```
*(Bu komut `.exe` dosyasını oluşturacaktır)*

### 3. Sonuç
İşlem bittiğinde, klasörün içindeki **`dist-electron`** klasörüne girin.
**`Ayascell Browser Setup 1.0.0.exe`** dosyasını göreceksiniz. Bu dosyayı kurup kullanabilirsiniz.

## Olası Hatalar ve Çözümleri

### "running scripts is disabled" Hatası Alırsanız
PowerShell güvenlik ayarları nedeniyle `npm` komutu çalışmayabilir. Bu durumda terminale şu komutu yapıştırıp Enter'a basın (Soru sorarsa 'Y' deyin):

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Ardından `npm install` komutunu tekrar deneyin.

---
**Not:** Linux veya macOS kullanıyorsanız `npm run electron:build` komutu o işletim sistemine uygun çıktı (AppImage veya dmg) verecektir.
