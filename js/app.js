// ===== MAIN APPLICATION (Supabase) =====

// ---------- DUMMY DATA ----------
const dummyHadiah = [
  { id: 1, name: 'Mobil', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300', desc: 'Mobil mewah impian Anda!', koin: 50000 },
  { id: 2, name: 'Honda Beat', image: 'https://images.unsplash.com/photo-1558981285-6f0c9495b3b0?w=300', desc: 'Motor Honda beat terbaru!', koin: 30000 },
  { id: 3, name: 'Sepeda Listrik', image: 'https://images.unsplash.com/photo-1576435771411-e5c8a1e0fc4e?w=300', desc: 'Sepeda listrik ramah lingkungan', koin: 15000 },
  { id: 4, name: 'Topi Premium', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=300', desc: 'Topi branded eksklusif', koin: 2000 },
  { id: 5, name: 'Kacamata', image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=300', desc: 'Kacamata trendi kekinian', koin: 2500 },
  { id: 6, name: 'Baju Casual', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300', desc: 'Baju casual nyaman dipakai', koin: 3000 },
  { id: 7, name: 'Celana Jeans', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300', desc: 'Celana jeans premium', koin: 3500 },
  { id: 8, name: 'Sepatu Sport', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300', desc: 'Sepatu olahraga original', koin: 4000 },
  { id: 9, name: 'Sandal Santai', image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=300', desc: 'Sandal nyaman untuk santai', koin: 1500 },
  { id: 10, name: 'Saldo E-Wallet 50rb', image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300', desc: 'Saldo dompet digital Rp50.000', koin: 5000 },
  { id: 11, name: 'Saldo E-Wallet 100rb', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=300', desc: 'Saldo dompet digital Rp100.000', koin: 10000 },
  { id: 12, name: 'Saldo E-Wallet 500rb', image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300', desc: 'Saldo dompet digital Rp500.000', koin: 50000 }
];

const dummySoal = [
  { q: 'Apa ibukota Indonesia?', options: ['Jakarta', 'Bandung', 'Surabaya', 'Medan', 'Yogyakarta'], correct: 0 },
  { q: 'Siapakah penemu bola lampu?', options: ['Einstein', 'Newton', 'Edison', 'Tesla', 'Faraday'], correct: 2 },
  { q: 'Berapa hasil 12 × 15?', options: ['120', '150', '180', '170', '160'], correct: 2 },
  { q: 'Planet terdekat dengan matahari?', options: ['Venus', 'Mars', 'Bumi', 'Merkurius', 'Jupiter'], correct: 3 },
  { q: 'Apa warna bendera Indonesia?', options: ['Merah-Putih', 'Merah-Biru', 'Putih-Hijau', 'Kuning-Hitam', 'Biru-Putih'], correct: 0 },
  { q: 'Siapa presiden ke-3 RI?', options: ['Soekarno', 'Soeharto', 'B.J. Habibie', 'Gus Dur', 'Megawati'], correct: 2 },
  { q: 'Hewan apa disebut "raja hutan"?', options: ['Harimau', 'Singa', 'Gajah', 'Macan', 'Serigala'], correct: 1 },
  { q: 'Apa nama alat untuk melihat bintang?', options: ['Mikroskop', 'Teleskop', 'Periskop', 'Endoskop', 'Stetoskop'], correct: 1 },
  { q: 'Berapa hari dalam setahun?', options: ['364', '365', '366', '360', '370'], correct: 1 },
  { q: 'Apa lambang sila ke-2 Pancasila?', options: ['Bintang', 'Pohon Beringin', 'Rantai', 'Kepala Banteng', 'Padi Kapas'], correct: 2 }
];

let currentQuizIndex = 0;
let quizAnswered = [];

// ===== INIT APP =====
async function initApp() {
  if (!currentUser) return;
  await loadUserData();
  updateUI();
  renderHadiah();
  loadSoal();
  loadRiwayat();
  updateAffiliate();
  loadNotif();
  renderAffiliateNetwork();
}

function updateUI() {
  if (!userData) return;
  document.getElementById('userCoins').textContent = userData.coins || 0;
  document.getElementById('userNameHome').textContent = userData.name || 'Pengguna';
  document.getElementById('profName').textContent = userData.name || '-';
  document.getElementById('profEmail').textContent = userData.email || '-';
  document.getElementById('profPhone').textContent = userData.phone || '-';
  if (userData.photo_url) {
    document.getElementById('profilePhoto').src = userData.photo_url;
  }
}

// ===== NAVIGATION =====
function navigate(page) {
  document.querySelectorAll('.tab-page').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));

  const pageMap = {
    'Home': 'pageHome',
    'Riwayat': 'pageRiwayat',
    'Kuis': 'pageKuis',
    'Affiliate': 'pageAffiliate',
    'Profil': 'pageProfil'
  };

  const pageId = pageMap[page];
  if (pageId) document.getElementById(pageId).classList.add('active');

  document.querySelectorAll('.nav-item').forEach(el => {
    if (el.textContent.trim().includes(page)) el.classList.add('active');
  });
}

// ===== MODAL =====
function openModal(html) {
  document.getElementById('modalContent').innerHTML = html;
  document.getElementById('modalOverlay').classList.remove('hidden');
}

function closeModal(e) {
  if (e && e.target !== document.getElementById('modalOverlay')) return;
  document.getElementById('modalOverlay').classList.add('hidden');
}

// ===== BERANDA - HADIAH =====
function renderHadiah() {
  const container = document.getElementById('hadiahList');
  container.innerHTML = dummyHadiah.map(h => `
    <div class="hadiah-card" onclick="detailHadiah(${h.id})">
      <img src="${h.image}" alt="${h.name}" loading="lazy" />
      <div class="hadiah-info">
        <h4>${h.name}</h4>
        <p class="hadiah-koin">🪙 ${h.koin.toLocaleString()}</p>
      </div>
    </div>
  `).join('');
}

function detailHadiah(id) {
  const h = dummyHadiah.find(item => item.id === id);
  if (!h) return;
  openModal(`
    <h2>${h.name}</h2>
    <img src="${h.image}" alt="${h.name}" style="width:100%;border-radius:8px;margin-bottom:12px;" />
    <p style="margin-bottom:10px;">${h.desc}</p>
    <p style="font-size:1.2rem;font-weight:700;margin-bottom:15px;">🪙 ${h.koin.toLocaleString()} Koin</p>
    <button class="btn btn-primary" onclick="tukarHadiah(${h.id})" style="width:100%;">Tukar Koin Sekarang</button>
  `);
}

async function tukarHadiah(id) {
  const h = dummyHadiah.find(item => item.id === id);
  if (!h) return;
  if (!userData || userData.coins < h.koin) {
    alert('Koin Anda tidak mencukupi! Ikuti kuis untuk mendapatkan koin.');
    return;
  }
  if (!confirm(`Tukar ${h.name} dengan ${h.koin.toLocaleString()} koin?`)) return;

  try {
    // Deduct coins via RPC
    await supabase.rpc('increment_coins', {
      user_id: currentUser.id,
      amount: -h.koin
    });

    // Record redemption
    await supabase.from('redemptions').insert({
      user_id: currentUser.id,
      hadiah_id: id,
      hadiah_name: h.name,
      koin: h.koin,
      status: 'diproses'
    });

    await loadUserData();
    updateUI();
    closeModal();
    alert(`✅ Berhasil menukar ${h.name}! Hadiah akan diproses.`);
  } catch (err) {
    alert('Gagal menukar: ' + err.message);
  }
}

// ===== PAKET =====
async function beliPaket(jenis, harga, durasiBulan) {
  if (!userData) return;
  if (!confirm(`Beli paket ${jenis} seharga Rp${harga.toLocaleString()}?`)) return;

  try {
    const now = new Date();
    const expiry = new Date(now.getTime() + durasiBulan * 30 * 24 * 60 * 60 * 1000);

    await supabase.from('users').update({
      paket: jenis,
      paket_expiry: expiry.toISOString(),
      coins: userData.coins + Math.floor(harga / 100)
    }).eq('id', currentUser.id);

    // Process affiliate commission (10 levels)
    await processAffiliateCommission(currentUser.id, harga);

    await loadUserData();
    updateUI();
    alert(`✅ Paket ${jenis} berhasil diaktifkan hingga ${expiry.toLocaleDateString()}! Bonus koin: ${Math.floor(harga / 100)}`);
  } catch (err) {
    alert('Gagal membeli paket: ' + err.message);
  }
}

// ===== RIWAYAT =====
function switchRiwayat(tab) {
  document.querySelectorAll('.tab-riwayat').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.riwayat-content').forEach(el => el.classList.remove('active'));

  if (tab === 'kuis') {
    document.querySelectorAll('.tab-riwayat')[0].classList.add('active');
    document.getElementById('riwayatKuis').classList.add('active');
  } else if (tab === 'hadiah') {
    document.querySelectorAll('.tab-riwayat')[1].classList.add('active');
    document.getElementById('riwayatHadiah').classList.add('active');
  } else if (tab === 'poin') {
    document.querySelectorAll('.tab-riwayat')[2].classList.add('active');
    document.getElementById('riwayatPoin').classList.add('active');
  }
}

async function loadRiwayat() {
  if (!currentUser) return;

  // Riwayat kuis (localStorage)
  const saved = JSON.parse(localStorage.getItem('quizHistory_' + currentUser.id) || '[]');
  const kuisEl = document.getElementById('riwayatKuis');
  if (saved.length === 0) {
    kuisEl.innerHTML = '<p style="color:var(--text-light)">Belum ada soal yang dijawab</p>';
  } else {
    kuisEl.innerHTML = saved.slice(-20).reverse().map(s => `
      <div class="riwayat-item">
        <strong>${s.q}</strong><br/>
        Jawaban: ${s.answer} ${s.correct ? '✅' : '❌'} | +${s.earned || 0} koin
      </div>
    `).join('');
  }

  // Riwayat hadiah ditukar (Supabase)
  try {
    const { data: redemptions } = await supabase
      .from('redemptions')
      .select('*')
      .eq('user_id', currentUser.id)
      .order('created_at', { ascending: false })
      .limit(20);

    const hadiahEl = document.getElementById('riwayatHadiah');
    if (!redemptions || redemptions.length === 0) {
      hadiahEl.innerHTML = '<p style="color:var(--text-light)">Belum ada hadiah ditukar</p>';
    } else {
      hadiahEl.innerHTML = redemptions.map(r => `
        <div class="riwayat-item">🎁 ${r.hadiah_name} - ${r.koin.toLocaleString()} koin (${r.status})</div>
      `).join('');
    }
  } catch (e) {
    console.warn('Riwayat hadiah error:', e);
  }

  // Penghasilan poin hari ini
  const today = new Date().toDateString();
  const todayQuiz = saved.filter(s => new Date(s.date).toDateString() === today);
  const totalKoin = todayQuiz.reduce((sum, s) => sum + (s.earned || 0), 0);
  document.getElementById('riwayatPoin').innerHTML = `
    <div class="riwayat-item">📊 Total poin hari ini: <strong>${totalKoin} koin</strong></div>
    <div class="riwayat-item">📝 Soal dijawab hari ini: <strong>${todayQuiz.length} soal</strong></div>
  `;
}

// ===== KUIS =====
function loadSoal() {
  if (dummySoal.length === 0) return;
  currentQuizIndex = 0;
  quizAnswered = [];
  renderSoal();
}

function renderSoal() {
  if (currentQuizIndex >= dummySoal.length) {
    document.getElementById('quizQuestion').textContent = '🎉 Semua soal selesai!';
    document.getElementById('quizOptions').innerHTML = '';
    return;
  }

  const soal = dummySoal[currentQuizIndex];
  document.getElementById('quizQuestion').textContent = `${currentQuizIndex + 1}. ${soal.q}`;

  const labels = ['A', 'B', 'C', 'D', 'E'];
  document.getElementById('quizOptions').innerHTML = soal.options.map((opt, idx) => `
    <button class="quiz-option" data-idx="${idx}" onclick="jawabSoal(${idx})">
      <strong>${labels[idx]}.</strong> ${opt}
    </button>
  `).join('');
}

function jawabSoal(idx) {
  const soal = dummySoal[currentQuizIndex];
  const options = document.querySelectorAll('.quiz-option');

  options.forEach(btn => btn.classList.add('disabled'));

  if (idx === soal.correct) {
    options[idx].classList.add('correct');
  } else {
    options[idx].classList.add('incorrect');
    options[soal.correct].classList.add('correct');
  }

  const earned = idx === soal.correct ? 10 : 0;

  // Save history
  const saved = JSON.parse(localStorage.getItem('quizHistory_' + currentUser.id) || '[]');
  saved.push({
    q: soal.q,
    answer: soal.options[idx],
    correct: idx === soal.correct,
    earned: earned,
    date: new Date().toISOString()
  });
  localStorage.setItem('quizHistory_' + currentUser.id, JSON.stringify(saved));

  // Show in history below
  const labels = ['A', 'B', 'C', 'D', 'E'];
  document.getElementById('quizHistory').innerHTML += `
    <div class="quiz-history-item">
      <strong>${soal.q}</strong><br/>
      Jawaban Anda: ${labels[idx]}. ${soal.options[idx]} ${idx === soal.correct ? '✅ +10 koin' : '❌'}
    </div>
  `;

  // Update coins via RPC if correct
  if (idx === soal.correct && currentUser) {
    supabase.rpc('increment_coins', {
      user_id: currentUser.id,
      amount: 10
    }).then(() => {
      loadUserData().then(updateUI);
    });
  }

  // Next question
  setTimeout(() => {
    currentQuizIndex++;
    if (currentQuizIndex < dummySoal.length) {
      renderSoal();
    } else {
      document.getElementById('quizQuestion').textContent = '🎉 Selamat! Anda telah menyelesaikan semua soal!';
      document.getElementById('quizOptions').innerHTML = '';
    }
  }, 1200);
}

// ===== AFFILIATE =====
async function updateAffiliate() {
  if (!userData) return;

  const baseUrl = window.location.origin + window.location.pathname;
  const link = baseUrl + '?ref=' + userData.referral_code;
  document.getElementById('affLink').value = link;
  document.getElementById('affSaldo').textContent = 'Rp' + (userData.affiliate_balance || 0).toLocaleString();
  document.getElementById('affClicks').textContent = userData.total_clicks || 0;
  document.getElementById('affJoins').textContent = userData.total_affiliates || 0;
  document.getElementById('affLevel').textContent = userData.level || 1;
  document.getElementById('affTeam').textContent = userData.total_affiliates || 0;

  // Check referral from URL
  const params = new URLSearchParams(window.location.search);
  const ref = params.get('ref');
  if (ref && !localStorage.getItem('ref_recorded_' + ref)) {
    localStorage.setItem('ref_recorded_' + ref, '1');
    const { data: refUser } = await supabase
      .from('users')
      .select('id')
      .eq('referral_code', ref)
      .single();
    if (refUser) {
      await supabase.rpc('increment_total_clicks', { user_id: refUser.id });
    }
  }
}

function copyAffLink() {
  const input = document.getElementById('affLink');
  input.select();
  navigator.clipboard.writeText(input.value).then(() => {
    alert('Link affiliate disalin!');
  }).catch(() => {
    alert('Salin manual: ' + input.value);
  });
}

function tarikSaldo() {
  if (!userData || userData.affiliate_balance < 50000) {
    alert('Minimal penarikan Rp50.000');
    return;
  }
  openModal(`
    <h2>Penarikan Saldo</h2>
    <p>Saldo Anda: <strong>Rp${(userData.affiliate_balance || 0).toLocaleString()}</strong></p>
    <input type="number" id="withdrawAmount" placeholder="Jumlah penarikan" min="50000" max="${userData.affiliate_balance || 0}" />
    <input type="text" id="withdrawBank" placeholder="Nama Bank / E-Wallet" />
    <input type="text" id="withdrawAccount" placeholder="Nomor Rekening / Akun" />
    <button class="btn btn-primary" onclick="prosesTarik()" style="width:100%;">Ajukan Penarikan</button>
  `);
}

async function prosesTarik() {
  const amount = parseInt(document.getElementById('withdrawAmount').value);
  const bank = document.getElementById('withdrawBank').value.trim();
  const account = document.getElementById('withdrawAccount').value.trim();

  if (!amount || amount < 50000) { alert('Minimal Rp50.000'); return; }
  if (!bank || !account) { alert('Isi data bank/e-wallet'); return; }

  try {
    await supabase.from('withdrawals').insert({
      user_id: currentUser.id,
      amount: amount,
      bank: bank,
      account: account,
      status: 'pending'
    });
    alert('✅ Penarikan diajukan! Menunggu verifikasi admin.');
    closeModal();
  } catch (err) {
    alert('Error: ' + err.message);
  }
}

// ===== NOTIFIKASI =====
function loadNotif() {
  const notifList = document.getElementById('notifList');
  notifList.innerHTML = `
    <div class="notif-item">🎉 Selamat datang di Bainves!</div>
    <div class="notif-item">💰 Jawab kuis untuk dapatkan koin</div>
    <div class="notif-item">🎁 Tukar koin dengan hadiah menarik</div>
    <div class="notif-item">🔗 Ajak teman via affiliate dapat komisi 10 level!</div>
  `;
}

function showNotif() {
  document.getElementById('notifDrawer').classList.remove('hidden');
}

function closeNotif() {
  document.getElementById('notifDrawer').classList.add('hidden');
}

// ===== PROFIL =====
function editPhoto() {
  openModal(`
    <h2>Edit Foto Profil</h2>
    <p>Masukkan URL foto profil baru:</p>
    <input type="url" id="photoUrl" placeholder="https://example.com/photo.jpg" />
    <button class="btn btn-primary" onclick="simpanPhoto()" style="width:100%;">Simpan</button>
  `);
}

async function simpanPhoto() {
  const url = document.getElementById('photoUrl').value.trim();
  if (!url) return;
  try {
    await supabase.from('users').update({ photo_url: url }).eq('id', currentUser.id);
    await loadUserData();
    updateUI();
    closeModal();
    alert('✅ Foto profil diperbarui!');
  } catch (err) {
    alert('Error: ' + err.message);
  }
}

function editField(field) {
  if (field === 'nama') {
    openModal(`
      <h2>Edit Nama</h2>
      <input type="text" id="editNama" value="${userData.name || ''}" />
      <button class="btn btn-primary" onclick="simpanNama()" style="width:100%;">Simpan</button>
    `);
  } else if (field === 'sandi') {
    openModal(`
      <h2>Edit Kata Sandi</h2>
      <input type="password" id="editSandiBaru" placeholder="Kata sandi baru (min 6 karakter)" minlength="6" />
      <button class="btn btn-primary" onclick="simpanSandi()" style="width:100%;">Simpan</button>
    `);
  } else if (field === 'wa') {
    openModal(`
      <h2>Edit Nomor WhatsApp</h2>
      <input type="text" id="editWA" value="${userData.phone || ''}" placeholder="08xxxxxxxxxx" />
      <button class="btn btn-primary" onclick="simpanWA()" style="width:100%;">Simpan</button>
    `);
  }
}

async function simpanNama() {
  const name = document.getElementById('editNama').value.trim();
  if (!name) return;
  try {
    await supabase.from('users').update({ name }).eq('id', currentUser.id);
    await loadUserData();
    updateUI();
    closeModal();
    alert('✅ Nama diperbarui!');
  } catch (err) {
    alert('Error: ' + err.message);
  }
}

async function simpanSandi() {
  const password = document.getElementById('editSandiBaru').value;
  if (password.length < 6) { alert('Minimal 6 karakter'); return; }
  try {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) throw error;
    closeModal();
    alert('✅ Kata sandi diperbarui!');
  } catch (err) {
    alert('Error: ' + err.message);
  }
}

async function simpanWA() {
  const phone = document.getElementById('editWA').value.trim();
  if (!phone) return;
  try {
    await supabase.from('users').update({ phone }).eq('id', currentUser.id);
    await loadUserData();
    updateUI();
    closeModal();
    alert('✅ Nomor WhatsApp diperbarui!');
  } catch (err) {
    alert('Error: ' + err.message);
  }
}

// ===== DARK MODE =====
function toggleDarkMode() {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
}

if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark');
  document.getElementById('darkModeToggle').checked = true;
}

// ===== BAHASA =====
function changeLang(val) {
  alert('Bahasa diubah ke ' + (val === 'id' ? 'Indonesia' : 'English'));
}

// ===== CHECK REFERRAL ON LOAD =====
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const ref = params.get('ref');
  if (ref) {
    localStorage.setItem('pendingReferral', ref);
    const refInput = document.getElementById('regReferral');
    if (refInput) refInput.value = ref;
  }
});
