# Nezaket Bulaşır

Dört arkadaşın akran nezaketi hikâyesi için Türkçe, mobil uyumlu tanıtım ve sunum sitesi. HTML, CSS ve JavaScript ile hazırlanmıştır; derleme, paket kurulumu veya sunucu uygulaması gerekmez.

## İçerik

1. Kahramanlar: Umut, Nida, Derya ve Can.
2. Hikâye: günlük okul yaşamına yayılan nezaket.
3. Sahneler: dört fotoğraflı sunum; ileri/geri, sahne seçimi, ok tuşları, kaydırma, isteğe bağlı otomatik oynatma ve desteklenen tarayıcılarda tam ekran.
4. Film: bağlantı eklendiğinde etkinleşen izleme alanı.

## Yerel çalıştırma

Proje klasöründe:

```sh
python3 -m http.server 8000 --directory web
```

Ardından tarayıcıda `http://localhost:8000` adresini açın. `web/index.html` dosyasını doğrudan açmak da mümkündür.

## Video bağlantısını ekleme

`web/config.js` dosyasındaki `videoUrl` alanına kendi bağlantınızı yapıştırın:

```js
window.FILM_CONFIG = {
  videoUrl: "https://www.youtube.com/watch?v=VIDEO_KIMLIGI",
};
```

Bu örnekteki adresi gerçek bağlantıyla değiştirin. YouTube, Vimeo ve Google Drive bağlantıları sayfa içinde oynatıcı olarak açılır. Doğrudan MP4/WebM/OGG bağlantıları yerleşik video oynatıcıda gösterilir. Diğer HTTP/HTTPS bağlantıları yeni sekmede açılır. Video sağlayıcısı gömülü gösterimi engellerse “Videoyu yeni sekmede aç” bağlantısını kullanın. Bağlantı boşken “Film yakında burada” mesajı görünür. Google Drive videosunu ziyaretçilerin izleyebilmesi için dosyanın paylaşım erişimi uygun olmalıdır; site, Drive izinlerini değiştirmez.

## GitHub Pages

1. Bu proje klasörünün içeriğini GitHub deponuza yükleyin. Gizli `.github` klasörünü de ekleyin.
2. Deponun varsayılan dalı `main` olmalıdır; farklıysa `.github/workflows/pages.yml` içindeki dal adını değiştirin.
3. GitHub'da **Settings → Pages → Source → GitHub Actions** seçin.
4. `main` dalına yükleme yapın veya **Actions** sekmesinden iş akışını elle çalıştırın.
5. Yayınlanan adres, iş akışının `github-pages` ortamında görünür.

Yalnızca `web/` klasörü yayınlanır; kaynak kitap, taslaklar ve eski görseller siteye yüklenmez. Site hem kök alan adında hem GitHub proje alt yolunda çalışacak göreli dosya adresleri kullanır. GitHub'a yükleme/yayınlama bu çalışma sırasında yapılmamıştır.

## Dosyalar

```text
web/
  index.html          # Türkçe arayüz
  config.js           # Video bağlantısı
  assets/
    style.css         # Masaüstü ve mobil tasarım
    app.js            # Slaytlar ve video oynatıcı
    favicon.svg
    images/1–4.png    # Dört sahnenin güncel fotoğrafları
.github/workflows/pages.yml
senaryo/              # Senaryo ve PDF
görsel/               # Asıl görseller ve yedekler
```

Google Fonts üzerinden DM Sans ve Manrope kullanılır; çevrimdışı durumda sistem yazı tiplerine geçilir. Mevcut sahne fotoğrafları kullanılmış, yeni karakter görseli üretilmemiştir. Film, MEB Akran Nezaketi Etkinlik Kitabı'ndan ilhamla oluşturulan özgün bir çalışmadır.
