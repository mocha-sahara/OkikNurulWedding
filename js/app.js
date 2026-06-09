// ==========================================
// FILE LOGIKA UTAMA (app.js)
// Mengatur injeksi data, musik, video intro, countdown, animasi,
// dan Fitur Buku Tamu / Ucapan dengan Komentar Balasan (Nested Replies)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Pastikan dataUndangan dari data.js terbaca
    if (typeof dataUndangan === 'undefined') {
        console.error("Data undangan tidak ditemukan! Pastikan file data.js dimuat sebelum app.js");
        return;
    }

    const data = dataUndangan;

    // ---------------------------------------------------------
    // 1. FITUR NAMA TAMU DINAMIS DARI URL (?to=Nama+Tamu)
    // ---------------------------------------------------------
    const urlParams = new URLSearchParams(window.location.search);
    const tamuDariUrl = urlParams.get('to');
    const elemenNamaTamu = document.getElementById('nama-tamu');

    if (elemenNamaTamu) {
        if (tamuDariUrl) {
            // Jika ada parameter ?to= di link, tampilkan namanya
            elemenNamaTamu.innerText = tamuDariUrl;
        } else {
            // Jika link dibuka biasa tanpa ?to=, tampilkan default
            elemenNamaTamu.innerText = "Tamu Undangan"; 
        }
    }

    // ---------------------------------------------------------
    // 2. INJEKSI DATA KE HTML (MENGISI KONTEN DINAMIS)
    // ---------------------------------------------------------
    
    // Title Web
    document.title = data.umum.judulWeb;

    // Cover
    document.getElementById('cover-nama-pasangan').innerText = `${data.mempelai.pria.namaPanggilan} & ${data.mempelai.wanita.namaPanggilan}`;
    document.getElementById('cover-tanggal').innerText = data.acara.akad.hariTanggal;

    // Video Intro Overlay (Menuliskan nama secara dinamis)
    const introNamaEl = document.getElementById('intro-nama-pasangan');
    if(introNamaEl) {
        introNamaEl.innerText = `${data.mempelai.pria.namaPanggilan} & ${data.mempelai.wanita.namaPanggilan}`;
    }

    // Kutipan
    document.getElementById('teks-kutipan').innerText = `"${data.kutipan.teks}"`;
    document.getElementById('sumber-kutipan').innerText = data.kutipan.sumber;

    // Mempelai Pria
    document.getElementById('foto-pria').src = data.mempelai.pria.foto;
    document.getElementById('nama-pria').innerText = data.mempelai.pria.namaLengkap;
    document.getElementById('ortu-pria').innerText = `Putra dari ${data.mempelai.pria.namaAyah} & ${data.mempelai.pria.namaIbu}`;
    document.getElementById('ig-pria').href = data.mempelai.pria.instagram;

    // Mempelai Wanita
    document.getElementById('foto-wanita').src = data.mempelai.wanita.foto;
    document.getElementById('nama-wanita').innerText = data.mempelai.wanita.namaLengkap;
    document.getElementById('ortu-wanita').innerText = `Putri dari ${data.mempelai.wanita.namaAyah} & ${data.mempelai.wanita.namaIbu}`;
    document.getElementById('ig-wanita').href = data.mempelai.wanita.instagram;

    // Acara Akad
    document.getElementById('nama-akad').innerText = data.acara.akad.namaAcara;
    document.getElementById('tanggal-akad').innerHTML = `<i class="far fa-calendar-alt"></i> ${data.acara.akad.hariTanggal}`;
    document.getElementById('waktu-akad').innerHTML = `<i class="far fa-clock"></i> ${data.acara.akad.waktu}`;
    document.getElementById('tempat-akad').innerText = `${data.acara.akad.tempat}\n${data.acara.akad.alamatLengkap}`;
    document.getElementById('map-akad').href = data.acara.akad.linkGoogleMaps;

    // Acara Resepsi
    document.getElementById('nama-resepsi').innerText = data.acara.resepsi.namaAcara;
    document.getElementById('tanggal-resepsi').innerHTML = `<i class="far fa-calendar-alt"></i> ${data.acara.resepsi.hariTanggal}`;
    document.getElementById('waktu-resepsi').innerHTML = `<i class="far fa-clock"></i> ${data.acara.resepsi.waktu}`;
    document.getElementById('tempat-resepsi').innerText = `${data.acara.resepsi.tempat}\n${data.acara.resepsi.alamatLengkap}`;
    document.getElementById('map-resepsi').href = data.acara.resepsi.linkGoogleMaps;

    // Penutup
    document.getElementById('teks-bawah').innerText = data.penutup.teksBawah;
    document.getElementById('salam-penutup').innerText = data.penutup.salam;
    document.getElementById('ucapan-terimakasih').innerText = data.penutup.terimaKasih;
    document.getElementById('nama-pasangan-penutup').innerText = `${data.mempelai.pria.namaPanggilan} & ${data.mempelai.wanita.namaPanggilan}`;


    // ---------------------------------------------------------
    // 3. RENDER HADIAH DIGITAL (REKENING & KADO)
    // ---------------------------------------------------------
    document.getElementById('teks-pengantar-hadiah').innerText = data.hadiahDigital.teksPengantar;
    
    const wadahRekening = document.getElementById('wadah-rekening');
    data.hadiahDigital.rekening.forEach(rek => {
        const divCard = document.createElement('div');
        divCard.className = 'rekening-card reveal'; // Ditambah class reveal untuk animasi scroll
        divCard.innerHTML = `
            <img src="${rek.qrCode}" alt="QR ${rek.bank}" class="qr-code">
            <h4 class="gold-text">${rek.bank}</h4>
            <p class="no-rek" id="rek-${rek.nomorRekening}">${rek.nomorRekening}</p>
            <p class="atas-nama">a.n. ${rek.atasNama}</p>
            <button onclick="salinTeks('${rek.nomorRekening}')" class="btn-outline btn-sm">
                <i class="far fa-copy"></i> Salin No. Rekening
            </button>
        `;
        wadahRekening.appendChild(divCard);
    });

    const kadoBox = document.getElementById('wadah-kado');
    if (data.hadiahDigital.kirimKado.aktif) {
        kadoBox.style.display = 'block';
        kadoBox.classList.add('reveal'); // Ditambah class reveal
        document.getElementById('penerima-kado').innerText = `Penerima: ${data.hadiahDigital.kirimKado.namaPenerima}`;
        document.getElementById('alamat-kado').innerText = data.hadiahDigital.kirimKado.alamatLengkap;
    }


    // ---------------------------------------------------------
    // 4. LOGIKA BUKA UNDANGAN, MUSIK & VIDEO MOTION
    // ---------------------------------------------------------
    const btnBuka = document.getElementById('btn-buka-undangan');
    const coverSection = document.getElementById('cover');
    const mainContent = document.getElementById('main-content');
    const audio = document.getElementById('lagu-background');
    const btnMusik = document.getElementById('btn-musik');
    const iconMusik = btnMusik.querySelector('i');
    
    const motionVideo = document.getElementById('motion-video');
    const videoOverlay = document.getElementById('video-overlay');

    let isPlaying = false;

    btnBuka.addEventListener('click', () => {
        // LANGSUNG PUTAR MUSIK SAAT DIKLIK (Tanpa Jeda)
        if (data.umum.putarOtomatis) {
            audio.play().catch(e => console.log("Gagal memutar audio: ", e));
            isPlaying = true;
            iconMusik.classList.remove('fa-music');
            iconMusik.classList.add('fa-pause');
        }

        // EFEK COVER BERGESER
        coverSection.style.transform = 'translateY(-100vh)';
        coverSection.style.transition = 'transform 1s ease-in-out';
        
        setTimeout(() => {
            coverSection.style.display = 'none';
            mainContent.style.display = 'block';
            
            // Putar video motion
            if (motionVideo) {
                motionVideo.currentTime = 0; 
                motionVideo.play().catch(e => console.log("Gagal memutar video: ", e));
            }

            // Pastikan scroll berada di paling atas melihat video
            window.scrollTo(0, 0);
        }, 800); 
    });

    // Kontrol Tombol Musik
    btnMusik.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            iconMusik.classList.remove('fa-pause');
            iconMusik.classList.add('fa-play');
        } else {
            audio.play();
            iconMusik.classList.remove('fa-play');
            iconMusik.classList.add('fa-pause');
        }
        isPlaying = !isPlaying;
    });


    // ---------------------------------------------------------
    // 5. LOGIKA OVERLAY VIDEO (Muncul 2 Detik Sebelum Selesai)
    // ---------------------------------------------------------
    if (motionVideo && videoOverlay) {
        let overlayShown = false; 

        motionVideo.addEventListener('timeupdate', () => {
            // Jika sisa waktu video kurang dari atau sama dengan 2 detik
            if (motionVideo.duration > 0 && !overlayShown) {
                if (motionVideo.duration - motionVideo.currentTime <= 2) {
                    videoOverlay.classList.add('show-overlay');
                    overlayShown = true; 
                }
            }
        });

        // Reset overlay jika video di-play ulang (opsional)
        motionVideo.addEventListener('play', () => {
            if (motionVideo.currentTime === 0) {
                videoOverlay.classList.remove('show-overlay');
                overlayShown = false;
            }
        });
    }


    // ---------------------------------------------------------
    // 6. LOGIKA COUNTDOWN (HITUNG MUNDUR)
    // ---------------------------------------------------------
    const targetDate = new Date(data.acara.akad.tanggalCountdown).getTime();

    const updateCountdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const hari = Math.floor(distance / (1000 * 60 * 60 * 24));
        const jam = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const menit = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const detik = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance > 0) {
            document.getElementById('cd-hari').innerText = hari.toString().padStart(2, '0');
            document.getElementById('cd-jam').innerText = jam.toString().padStart(2, '0');
            document.getElementById('cd-menit').innerText = menit.toString().padStart(2, '0');
            document.getElementById('cd-detik').innerText = detik.toString().padStart(2, '0');
        } else {
            clearInterval(updateCountdown);
            document.getElementById('cd-hari').innerText = "00";
            document.getElementById('cd-jam').innerText = "00";
            document.getElementById('cd-menit').innerText = "00";
            document.getElementById('cd-detik').innerText = "00";
        }
    }, 1000);


    // ---------------------------------------------------------
    // 7. SCROLL REVEAL ANIMATION (Muncul perlahan saat di-scroll)
    // ---------------------------------------------------------
    const elementsToReveal = document.querySelectorAll('.section-title, .mempelai-card, .acara-card, .quote-text, .divider, .box-mewah');
    // Pastikan box-mewah juga kena efek animasi
    elementsToReveal.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, { 
        threshold: 0.15, 
        rootMargin: "0px 0px -50px 0px" 
    });

    elementsToReveal.forEach(el => revealObserver.observe(el));

    // Observe elemen yang digenerate dinamis (seperti rekening)
    setTimeout(() => {
        const dynamicElements = document.querySelectorAll('.rekening-card, .kado-box');
        dynamicElements.forEach(el => revealObserver.observe(el));
    }, 500);


    // ---------------------------------------------------------
    // 8. EFEK PARTIKEL EMAS JATUH
    // ---------------------------------------------------------
    const particleContainer = document.createElement('div');
    particleContainer.id = 'particles-container';
    document.body.appendChild(particleContainer);

    function createParticle() {
        // Jangan jalankan jika masih di layar cover
        if (coverSection.style.display !== 'none') return;

        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Ukuran partikel acak (2px sampai 5px)
        const size = Math.random() * 3 + 2; 
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Posisi mendatar acak
        particle.style.left = `${Math.random() * 100}vw`;
        
        // Durasi jatuh acak
        const duration = Math.random() * 7 + 5; 
        particle.style.animationDuration = `${duration}s`;
        
        particleContainer.appendChild(particle);
        
        // Hapus partikel setelah selesai jatuh
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }

    // Buat 1 partikel baru setiap 400 milidetik
    setInterval(createParticle, 400);


    // ---------------------------------------------------------
    // 9. RE-COUPLED GUEST BOOK ENGINE (WITH NESTED REPLIES!)
    // ---------------------------------------------------------
    
    // Initial wishes if none exist in localStorage
    const INITIAL_WISHES = [
        {
            id: 'wish-1',
            name: 'Keluarga Bpk. Sunarto (Sidoarjo)',
            rsvpStatus: 'hadir',
            message: 'Barakallahu lakum wa baraka alaikum wa jama\'a bainakuma fii khair. Selamat menempuh hidup baru untuk Okik & Nurul! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Aamiin ya robal alamin.',
            timestamp: Date.now() - 3600000 * 4, // 4 hours ago
            replies: [
                {
                    id: 'r-1-1',
                    name: 'Okik & Nurul',
                    isHost: true,
                    message: 'Aamiin yra. Matur nuwun sanget atas doanya Pakde Sunarto sekeluarga, semoga Pakde sekeluarga senantiasa diberikan kelancaran & keberkahan.',
                    timestamp: Date.now() - 3600000 * 3.5
                }
            ]
        },
        {
            id: 'wish-2',
            name: 'Aris Prasetyo',
            rsvpStatus: 'hadir',
            message: 'Selamat bro Okik! Lancar-lancar acaranya sampai hari H ya. Maaf belum bisa bantu banyak, pasti merapat dari pagi!',
            timestamp: Date.now() - 3600000 * 12, // 12 hours ago
            replies: [
                {
                    id: 'r-2-1',
                    name: 'Okik',
                    isHost: true,
                    message: 'Hahaha siaap bro Aris! Makasih banyak, tak tunggu lho ya kehadirannya!',
                    timestamp: Date.now() - 3600000 * 11
                }
            ]
        },
        {
            id: 'wish-3',
            name: 'Riska Indah Lestari',
            rsvpStatus: 'ragu_ragu',
            message: 'Selamat berbahagia Nurul sayang! Cantik banget pastinya di pelaminan nanti. Mohon maaf sepertinya datang agak siang karena ada ujian diklat pagi harinya, tapi diusahakan hadir.',
            timestamp: Date.now() - 3600000 * 24, // 1 day ago
            replies: []
        }
    ];

    let wishes = [];

    // Load wishes from database (localStorage)
    function loadWishes() {
        const stored = localStorage.getItem('undangan_wishes_v2');
        if (stored) {
            try {
                wishes = JSON.parse(stored);
                // Sanitize legacy elements if missing replies
                wishes = wishes.map(w => ({
                    ...w,
                    replies: w.replies || []
                }));
            } catch (e) {
                wishes = [...INITIAL_WISHES];
            }
        } else {
            wishes = [...INITIAL_WISHES];
            saveWishes();
        }
    }

    // Save wishes to database (localStorage)
    function saveWishes() {
        localStorage.setItem('undangan_wishes_v2', JSON.stringify(wishes));
    }

    // Hitung relative date indonesian
    function formatTimeDifference(timestamp) {
        const diff = Date.now() - timestamp;
        const diffSeconds = Math.floor(diff / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffSeconds < 60) {
            return 'Baru saja';
        } else if (diffMinutes < 60) {
            return `${diffMinutes} menit yang lalu`;
        } else if (diffHours < 24) {
            return `${diffHours} jam yang lalu`;
        } else {
            return `${diffDays} hari yang lalu`;
        }
    }

    // Render list ke DOM
    const containerWishes = document.getElementById('container-daftar-ucapan');
    const totalWishesCountEl = document.getElementById('total-wishes-count');
    const selectFilter = document.getElementById('select-filter-rsvp');

    function renderWishes() {
        if (!containerWishes) return;

        const filter = selectFilter ? selectFilter.value : 'all';
        let filtered = wishes;

        if (filter !== 'all') {
            filtered = wishes.filter(w => w.rsvpStatus === filter);
        }

        // Hitung total wishes
        if (totalWishesCountEl) {
            totalWishesCountEl.innerText = wishes.length.toString();
        }

        containerWishes.innerHTML = '';

        if (filtered.length === 0) {
            containerWishes.innerHTML = `
                <div style="text-align: center; padding: 30px; color: rgba(255, 255, 255, 0.4); font-style: italic; font-size: 0.95rem;">
                    Belum ada ucapan untuk kategori ini.
                </div>
            `;
            return;
        }

        filtered.forEach(wish => {
            // Label status RSVP
            let rsvpLabel = 'Hadir';
            let rsvpClass = 'hadir';
            if (wish.rsvpStatus === 'tidak_hadir') {
                rsvpLabel = 'Tidak Hadir';
                rsvpClass = 'tidak-hadir';
            } else if (wish.rsvpStatus === 'ragu_ragu') {
                rsvpLabel = 'Ragu-ragu';
                rsvpClass = 'ragu-ragu';
            }

            const wishCard = document.createElement('div');
            wishCard.className = 'ucapan-card';
            wishCard.setAttribute('data-id', wish.id);

            // Build comments html
            let commentsHtml = '';
            const replies = wish.replies || [];
            replies.forEach(rep => {
                commentsHtml += `
                    <div class="reply-card">
                        <div class="reply-header">
                            <span class="reply-nama ${rep.isHost ? 'host-text' : ''}">
                                ${rep.name} 
                                ${rep.isHost ? '<span class="badge-mempelai">Mempelai 👑</span>' : ''}
                            </span>
                            <span class="reply-waktu">${formatTimeDifference(rep.timestamp)}</span>
                        </div>
                        <p class="reply-teks">${rep.message}</p>
                    </div>
                `;
            });

            wishCard.innerHTML = `
                <div class="ucapan-header">
                    <span class="ucapan-nama">${wish.name}</span>
                    <span class="badge-rsvp ${rsvpClass}">${rsvpLabel}</span>
                </div>
                <span class="ucapan-waktu"><i class="far fa-clock"></i> ${formatTimeDifference(wish.timestamp)}</span>
                <p class="ucapan-teks">${wish.message}</p>
                
                <div class="ucapan-footer">
                    <button class="btn-balas" onclick="toggleRepliesBox('${wish.id}')">
                        <i class="far fa-comment-dots"></i> 
                        <span>${replies.length > 0 ? `${replies.length} Komentar` : 'Balas / Komentar'}</span>
                    </button>
                    <button class="btn-hapus-ucapan" onclick="deleteWish('${wish.id}')" title="Hapus Ucapan">
                        <i class="far fa-trash-alt"></i>
                    </button>
                </div>

                <div class="replies-box" id="replies-wrapper-${wish.id}" style="display: none;">
                    <div class="replies-list" id="replies-list-${wish.id}">
                        ${commentsHtml || `<div style="padding: 10px; font-size: 0.8rem; color: rgba(255,255,255,0.3); font-style: italic;">Belum ada balasan. Silakan balas ucapan ini!</div>`}
                    </div>
                    
                    <!-- Form comments / reply -->
                    <form class="form-internal-reply" onsubmit="submitReply(event, '${wish.id}')">
                        <div style="display: flex; gap: 10px; flex-wrap: wrap;" id="reply-fields-row-${wish.id}">
                            <input type="text" placeholder="Nama Anda" required class="reply-input-name" id="reply-name-${wish.id}" style="flex: 1; min-width: 140px;">
                            
                            <label class="host-toggle-wrapper">
                                <input type="checkbox" id="reply-ishost-${wish.id}" onchange="toggleHostReplyMode('${wish.id}')">
                                <span>Balas sebagai Mempelai 👑</span>
                            </label>
                        </div>
                        
                        <div class="reply-message-row">
                            <input type="text" placeholder="Tulis komentar/balasan Anda di sini..." required class="reply-input-message" id="reply-msg-${wish.id}">
                            <button type="submit" class="btn-send-reply">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </form>
                </div>
            `;

            containerWishes.appendChild(wishCard);
        });
    }

    // Setup RSVP selector buttons inside the main wish form
    const rsvpButtons = document.querySelectorAll('.btn-rsvp');
    const inputRsvp = document.getElementById('input-rsvp');

    rsvpButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            rsvpButtons.forEach(b => {
                b.classList.remove('active');
                b.style.background = 'rgba(255, 255, 255, 0.05)';
                b.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                b.style.color = '#ccc';
            });

            // Set active classes
            btn.classList.add('active');
            const val = btn.getAttribute('data-rsvp');
            if (inputRsvp) {
                inputRsvp.value = val;
            }

            // Set specific colors
            if (val === 'hadir') {
                btn.style.background = 'rgba(46, 204, 113, 0.15)';
                btn.style.borderColor = '#2ecc71';
                btn.style.color = '#2ecc71';
            } else if (val === 'tidak_hadir') {
                btn.style.background = 'rgba(231, 76, 60, 0.15)';
                btn.style.borderColor = '#e74c3c';
                btn.style.color = '#e74c3c';
            } else if (val === 'ragu_ragu') {
                btn.style.background = 'rgba(241, 196, 15, 0.15)';
                btn.style.borderColor = '#f1c40f';
                btn.style.color = '#f1c40f';
            }
        });
    });

    // Form Wish submitted
    const formUcapan = document.getElementById('form-ucapan');
    if (formUcapan) {
        formUcapan.addEventListener('submit', (e) => {
            e.preventDefault();

            const nama = document.getElementById('input-nama').value.trim();
            const rsvp = document.getElementById('input-rsvp').value;
            const pesan = document.getElementById('input-pesan').value.trim();

            if (!nama || !pesan) return;

            const newWish = {
                id: 'wish-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
                name: nama,
                rsvpStatus: rsvp,
                message: pesan,
                timestamp: Date.now(),
                replies: []
            };

            wishes.unshift(newWish); // Tambah ke atas list
            saveWishes();
            renderWishes();

            // Reset form
            document.getElementById('input-nama').value = '';
            document.getElementById('input-pesan').value = '';
            
            // Re-center scroll to the newly added wish
            if (containerWishes) {
                containerWishes.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Filter Change event
    if (selectFilter) {
        selectFilter.addEventListener('change', renderWishes);
    }

    // Global toggle replies box function
    window.toggleRepliesBox = function(wishId) {
        const box = document.getElementById(`replies-wrapper-${wishId}`);
        if (box) {
            if (box.style.display === 'none') {
                box.style.display = 'block';
            } else {
                box.style.display = 'none';
            }
        }
    };

    // Global toggle host reply mode function
    window.toggleHostReplyMode = function(wishId) {
        const isHostCheckbox = document.getElementById(`reply-ishost-${wishId}`);
        const nameInput = document.getElementById(`reply-name-${wishId}`);

        if (isHostCheckbox && nameInput) {
            if (isHostCheckbox.checked) {
                nameInput.value = 'Okik & Nurul (Mempelai)';
                nameInput.style.display = 'none';
                nameInput.required = false;
            } else {
                nameInput.value = '';
                nameInput.style.display = 'block';
                nameInput.required = true;
            }
        }
    };

    // Global delete wish function (secure confirmation)
    window.deleteWish = function(wishId) {
        if (confirm("Apakah Anda yakin ingin menghapus ucapan ini?")) {
            wishes = wishes.filter(w => w.id !== wishId);
            saveWishes();
            renderWishes();
        }
    };

    // Global submit nested reply function
    window.submitReply = function(event, wishId) {
        event.preventDefault();

        const nameInput = document.getElementById(`reply-name-${wishId}`);
        const msgInput = document.getElementById(`reply-msg-${wishId}`);
        const checkboxHost = document.getElementById(`reply-ishost-${wishId}`);

        if (!msgInput) return;

        const isHost = checkboxHost ? checkboxHost.checked : false;
        const name = isHost ? 'Okik & Nurul (Mempelai)' : (nameInput ? nameInput.value.trim() : 'Anonim');
        const message = msgInput.value.trim();

        if (!message) return;

        const newReply = {
            id: 'reply-' + Date.now() + '-' + Math.floor(Math.random() * 100),
            name: name,
            isHost: isHost,
            message: message,
            timestamp: Date.now()
        };

        wishes = wishes.map(wish => {
            if (wish.id === wishId) {
                return {
                    ...wish,
                    replies: [...(wish.replies || []), newReply]
                };
            }
            return wish;
        });

        saveWishes();
        renderWishes();

        // Keep the comments box open
        const box = document.getElementById(`replies-wrapper-${wishId}`);
        if (box) box.style.display = 'block';
    };

    // Initialize wishes lists
    loadWishes();
    renderWishes();
});

// ---------------------------------------------------------
// 10. FUNGSI GLOBAL (Bisa dipanggil langsung dari HTML)
// ---------------------------------------------------------

// Fungsi untuk menyalin nomor rekening ke clipboard
window.salinTeks = function(teks) {
    navigator.clipboard.writeText(teks).then(() => {
        alert("Nomor rekening " + teks + " berhasil disalin!");
    }).catch(err => {
        console.error('Gagal menyalin teks: ', err);
        alert("Gagal menyalin nomor rekening.");
    });
};

// ANTI JEDA LOOPING AUDIO
const audioEl = document.getElementById('lagu-background');
if (audioEl) {
    audioEl.addEventListener('timeupdate', function() {
        // Angka 0.4 berarti lagu akan dipaksa mengulang 0.4 detik sebelum benar-benar habis.
        // Jika jedanya masih merasa, perbesar angkanya (misal: 0.6 atau 0.8)
        const potongAkhir = 0.4; 
        
        if (this.duration > 0 && this.currentTime > this.duration - potongAkhir) {
            // Angka 0.2 berarti lagu mulai memutar dari detik ke-0.2 (melewati hening di awal)
            this.currentTime = 0.2; 
            this.play().catch(e => console.log(e));
        }
    });
}
