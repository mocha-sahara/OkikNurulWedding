// ==========================================
// FILE PUSAT DATA UNDANGAN DIGITAL
// Tema: Biru Mewah & Elegan (Navy & Gold)
// ==========================================

const dataUndangan = {
    // 1. PENGATURAN UMUM & MUSIK
    umum: {
        judulWeb: "The Wedding of okik & nurul",
        deskripsiWeb: "Undangan Pernikahan okik & nurul",
        audioLatar: "https://okik-nurul-wedding.vercel.app/assets/audio/lagu.MP3", // Path ke file lagu
        putarOtomatis: true
    },

    // 2. KUTIPAN / AYAT (Opsional, biasa diletakkan sebelum profil)
    kutipan: {
        teks: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
        sumber: "QS. Ar-Rum: 21"
    },

    // 3. DATA MEMPELAI
    mempelai: {
        pria: {
            namaLengkap: "Okik Aris Setiawan, S.T.",
            namaPanggilan: "Okik",
            namaAyah: "Bpk. Heri Susanto",
            namaIbu: "Ibu Nanik",
            foto: "assets/images/okik1.jpeg",
            instagram: "https://instagram.com/nuristiana010" 
        },
        wanita: {
            namaLengkap: "Nurul Dwi Indah Istiana, S.M.",
            namaPanggilan: "Nurul",
            namaAyah: "Bpk. Ekhwan Sunarto",
            namaIbu: "Ibu Hariyatun",
            foto: "assets/images/nurul10.jpeg",
            instagram: "https://instagram.com/nuristiana010" 
        }
    },

    // 4. DATA ACARA
    acara: {
        akad: {
            namaAcara: "Akad Nikah",
            hariTanggal: "Minggu, 02 Agustus 2026", // Teks ini yang akan dibaca pengunjung di layar
            tanggalCountdown: "2026-08-02T08:00:00", // 🔥 INI UNTUK HITUNG MUNDUR (Format: YYYY-MM-DDTHH:mm:ss)
            waktu: "08:00 WIB - 10:00 WIB",
            tempat: "Rumah Bapak Ekhwan Sunarto",
            alamatLengkap: "Dsn. Balongrejo, Ds. Balonggebang, RT 30, RW 10, Kec. Gondang ,Kab. Nganjuk, 64451",
            linkGoogleMaps: "https://goo.gl/maps/1Dvg7RLgNhKyL9bs8?g_st=ac",
            zonaWaktu: "Asia/Jakarta"
        },
        resepsi: {
            namaAcara: "Resepsi Pernikahan",
            hariTanggal: "Minggu, 02 Agustus 2026",
            waktu: "fleksibel",
            tempat: "Rumah Bapak Ekhwan Sunarto",
            alamatLengkap: "Dsn. Balongrejo, Ds. Balonggebang, RT 30, RW 10, Kec. Gondang ,Kab. Nganjuk, 64451",
            linkGoogleMaps: "https://goo.gl/maps/1Dvg7RLgNhKyL9bs8?g_st=ac"
        }
    },

    // 5. FITUR LIVE STREAMING (Jika ada)
    liveStreaming: {
        aktif: false, // Ubah ke true jika ingin menampilkan tombol live
        platform: "YouTube",
        linkUtama: "https://youtube.com/live/contohlink"
    },

    // 6. GALERI FOTO (Array data foto prewedding)
    galeri: [
        { path: "assets/images/gallery/g1.jpg", altText: "Foto Prewedding 1" },
        { path: "assets/images/gallery/g2.jpg", altText: "Foto Prewedding 2" },
        { path: "assets/images/gallery/g3.jpg", altText: "Foto Prewedding 3" },
        { path: "assets/images/gallery/g4.jpg", altText: "Foto Prewedding 4" }
    ],

    // 7. HADIAH DIGITAL (Amplop Digital & Kirim Kado)
    hadiahDigital: {
        teksPengantar: "Tanpa mengurangi rasa hormat, bagi Bapak/Ibu/Saudara/i yang ingin memberikan tanda kasih untuk kami, dapat melalui:",
        rekening: [
            {
                bank: "BCA",
                atasNama: "Okik Aris Setiawan",
                nomorRekening: "1234567890",
                qrCode: "assets/images/qrcode/qr-bca-pria.png"
            },
            {
                bank: "Bank Mandiri",
                atasNama: "Okik Aris Setiawan",
                nomorRekening: "0987654321",
                qrCode: "assets/images/qrcode/qr-mandiri-wanita.png"
            }
        ],
        kirimKado: {
            aktif: true,
            namaPenerima: "nurul dwi",
            alamatLengkap: "Dsn. Balongrejo, Ds. Balonggebang, RT 30, RW 10, Kec. Gondang ,Kab. Nganjuk, 64451"
        }
    },

    // 8. RSVP & UCAPAN (Integrasi WhatsApp)
   /* rsvp: {
        nomorWhatsApp: "6285856122960", // Gunakan format 62 tanpa + atau 0
        pesanDefaultHadir: "Halo, saya ingin mengonfirmasi bahwa saya *akan hadir* pada acara pernikahan Pria & Imroatus.",
        pesanDefaultTidakHadir: "Halo, saya memohon maaf karena *tidak dapat hadir* pada acara pernikahan Pria & Imroatus. Semoga lancar acaranya!"
    },*/

    // 9. PENUTUP
    penutup: {
        teksBawah: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.\n\n",
        salam: "Wassalamu'alaikum Warahmatullahi Wabarakatuh\n",
        terimaKasih: "Kami yang berbahagia,"
    }
};

// Jangan hapus baris di bawah ini
// Ini berfungsi agar data bisa dibaca oleh file app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = dataUndangan;
}
