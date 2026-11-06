import React, { useState, useEffect } from 'react';
import { 
  Calculator, BookOpen, Globe, Brain, Lightbulb, Shapes, Music, 
  Dog, Apple, Map, Rocket, Clock, Puzzle, Type, Hash, ArrowRightLeft, 
  ListOrdered, Eye, Star, Trophy, Gamepad2, ArrowLeft, CheckCircle2, XCircle
} from 'lucide-react';

// --- DATA: 20 GAME EDUKASI ---
const GAMES_DATA = [
  // Kategori: MATEMATIKA
  {
    id: 'math-add', title: 'Penjumlahan Ceria', category: 'Matematika', 
    description: 'Latih kecepatan menjumlahkan angka.', icon: Calculator, color: 'sky',
    questions: [
      { q: 'Berapa hasil dari 15 + 8?', options: ['21', '22', '23', '24'], answer: '23' },
      { q: 'Jika Budi punya 5 apel dan Andi memberinya 7 apel, berapa apel Budi sekarang?', options: ['10', '12', '14', '15'], answer: '12' },
      { q: '20 + 35 = ?', options: ['45', '50', '55', '60'], answer: '55' }
    ]
  },
  {
    id: 'math-sub', title: 'Pengurangan Super', category: 'Matematika', 
    description: 'Mari belajar mengurangkan angka.', icon: Hash, color: 'sky',
    questions: [
      { q: 'Berapa hasil dari 25 - 9?', options: ['14', '16', '18', '20'], answer: '16' },
      { q: 'Ibu membawa 10 telur, 3 pecah di jalan. Sisa telur Ibu adalah?', options: ['6', '7', '8', '9'], answer: '7' },
      { q: '50 - 25 = ?', options: ['15', '20', '25', '30'], answer: '25' }
    ]
  },
  {
    id: 'math-mul', title: 'Master Perkalian', category: 'Matematika', 
    description: 'Hafalkan perkalian dasar dengan seru.', icon: Star, color: 'sky',
    questions: [
      { q: 'Berapa hasil 6 x 7?', options: ['36', '42', '48', '49'], answer: '42' },
      { q: 'Ada 4 kotak berisi masing-masing 5 permen. Berapa jumlah semua permen?', options: ['15', '20', '25', '30'], answer: '20' },
      { q: '8 x 8 = ?', options: ['56', '64', '72', '80'], answer: '64' }
    ]
  },
  {
    id: 'math-div', title: 'Pembagian Adil', category: 'Matematika', 
    description: 'Membagi angka sama rata.', icon: Shapes, color: 'sky',
    questions: [
      { q: 'Berapa hasil 36 dibagi 6?', options: ['5', '6', '7', '8'], answer: '6' },
      { q: '12 potong kue dibagikan kepada 4 anak. Tiap anak dapat berapa potong?', options: ['2', '3', '4', '6'], answer: '3' },
      { q: '45 : 9 = ?', options: ['4', '5', '6', '7'], answer: '5' }
    ]
  },
  {
    id: 'math-seq', title: 'Deret Angka', category: 'Matematika', 
    description: 'Tebak angka selanjutnya dalam pola.', icon: ListOrdered, color: 'sky',
    questions: [
      { q: 'Angka selanjutnya: 2, 4, 6, 8, ...', options: ['9', '10', '12', '14'], answer: '10' },
      { q: 'Angka selanjutnya: 5, 10, 15, 20, ...', options: ['21', '25', '30', '35'], answer: '25' },
      { q: 'Angka selanjutnya: 1, 4, 7, 10, ...', options: ['11', '12', '13', '14'], answer: '13' }
    ]
  },

  // Kategori: BAHASA
  {
    id: 'lang-ant', title: 'Lawan Kata', category: 'Bahasa', 
    description: 'Cari antonim dari kata berikut.', icon: ArrowRightLeft, color: 'rose',
    questions: [
      { q: 'Lawan kata dari "PANJANG" adalah?', options: ['Tinggi', 'Pendek', 'Kecil', 'Jauh'], answer: 'Pendek' },
      { q: 'Lawan kata dari "GELAP" adalah?', options: ['Terang', 'Malam', 'Cahaya', 'Hitam'], answer: 'Terang' },
      { q: 'Lawan kata dari "BERAT" adalah?', options: ['Kuat', 'Besar', 'Ringan', 'Tipis'], answer: 'Ringan' }
    ]
  },
  {
    id: 'lang-syn', title: 'Persamaan Kata', category: 'Bahasa', 
    description: 'Temukan kata dengan makna sama.', icon: Type, color: 'rose',
    questions: [
      { q: 'Persamaan kata "PINTAR" adalah?', options: ['Cerdas', 'Rajin', 'Kuat', 'Hebat'], answer: 'Cerdas' },
      { q: 'Persamaan kata "CEPAT" adalah?', options: ['Lama', 'Laju', 'Kencang', 'Tangkas'], answer: 'Kencang' }, // Adjusted to exact match expectation
      { q: 'Persamaan kata "BOHONG" adalah?', options: ['Jujur', 'Dusta', 'Benar', 'Salah'], answer: 'Dusta' }
    ]
  },
  {
    id: 'lang-spell', title: 'Ejaan Tepat', category: 'Bahasa', 
    description: 'Pilih penulisan kata yang benar.', icon: BookOpen, color: 'rose',
    questions: [
      { q: 'Penulisan yang benar adalah?', options: ['Apotik', 'Apotek', 'Apotic', 'Apothek'], answer: 'Apotek' },
      { q: 'Penulisan yang benar adalah?', options: ['Jadwal', 'Jadual', 'Jadual', 'Zadwal'], answer: 'Jadwal' },
      { q: 'Penulisan yang benar adalah?', options: ['Antri', 'Antre', 'Antry', 'Antrei'], answer: 'Antre' }
    ]
  },
  {
    id: 'lang-proverb', title: 'Tebak Peribahasa', category: 'Bahasa', 
    description: 'Lengkapi peribahasa populer Indonesia.', icon: BookOpen, color: 'rose',
    questions: [
      { q: 'Ada gula ada ...', options: ['Semut', 'Kopi', 'Manis', 'Teh'], answer: 'Semut' },
      { q: 'Besar pasak daripada ...', options: ['Tiang', 'Kayu', 'Besi', 'Bambu'], answer: 'Tiang' },
      { q: 'Air susu dibalas dengan air ...', options: ['Putih', 'Kopi', 'Tuba', 'Mata'], answer: 'Tuba' }
    ]
  },
  {
    id: 'lang-guess', title: 'Tebak Benda', category: 'Bahasa', 
    description: 'Tebak benda dari deskripsinya.', icon: Lightbulb, color: 'rose',
    questions: [
      { q: 'Aku terbuat dari kayu, punya 4 kaki, dipakai untuk duduk. Siapakah aku?', options: ['Meja', 'Kursi', 'Lemari', 'Pintu'], answer: 'Kursi' },
      { q: 'Aku tempat menyimpan uang, bentukku kecil bisa masuk saku. Siapakah aku?', options: ['Tas', 'Karung', 'Dompet', 'Celengan'], answer: 'Dompet' },
      { q: 'Aku turun dari langit, membuat bajumu basah. Siapakah aku?', options: ['Awan', 'Salju', 'Hujan', 'Angin'], answer: 'Hujan' }
    ]
  },

  // Kategori: PENGETAHUAN UMUM
  {
    id: 'gk-animal', title: 'Dunia Hewan', category: 'Pengetahuan Umum', 
    description: 'Kenali berbagai jenis hewan peliharaan dan liar.', icon: Dog, color: 'emerald',
    questions: [
      { q: 'Hewan apa yang dijuluki Raja Hutan?', options: ['Harimau', 'Singa', 'Gajah', 'Serigala'], answer: 'Singa' },
      { q: 'Hewan bernapas dengan insang dan hidup di air adalah?', options: ['Katak', 'Buaya', 'Ikan', 'Penyu'], answer: 'Ikan' },
      { q: 'Hewan apa yang memiliki leher sangat panjang?', options: ['Unta', 'Kuda Nil', 'Jerapah', 'Burung Unta'], answer: 'Jerapah' }
    ]
  },
  {
    id: 'gk-fruit', title: 'Tebak Buah', category: 'Pengetahuan Umum', 
    description: 'Kenali berbagai buah kaya vitamin.', icon: Apple, color: 'emerald',
    questions: [
      { q: 'Buah yang bentuknya berduri dan baunya tajam adalah?', options: ['Nangka', 'Durian', 'Sirsak', 'Nanas'], answer: 'Durian' },
      { q: 'Buah berawalan huruf "A" dan dagingnya berwarna merah/hijau adalah?', options: ['Apel', 'Anggur', 'Alpukat', 'Asam'], answer: 'Apel' },
      { q: 'Buah kuning panjang yang disukai monyet adalah?', options: ['Mangga', 'Pepaya', 'Pisang', 'Melon'], answer: 'Pisang' }
    ]
  },
  {
    id: 'gk-geo', title: 'Ibukota Provinsi', category: 'Pengetahuan Umum', 
    description: 'Belajar geografi Indonesia.', icon: Map, color: 'emerald',
    questions: [
      { q: 'Ibukota Provinsi Jawa Timur adalah?', options: ['Semarang', 'Surabaya', 'Bandung', 'Malang'], answer: 'Surabaya' },
      { q: 'Ibukota Provinsi Bali adalah?', options: ['Denpasar', 'Singaraja', 'Kuta', 'Gianyar'], answer: 'Denpasar' },
      { q: 'Ibukota Negara Indonesia adalah?', options: ['Jakarta', 'IKN Nusantara', 'Surabaya', 'Medan'], answer: 'Jakarta' } // Keeping it simple for kids, technically transitioning
    ]
  },
  {
    id: 'gk-space', title: 'Jelajah Tata Surya', category: 'Pengetahuan Umum', 
    description: 'Mengenal planet-planet di tata surya kita.', icon: Rocket, color: 'emerald',
    questions: [
      { q: 'Planet tempat kita tinggal bernama?', options: ['Mars', 'Bumi', 'Venus', 'Jupiter'], answer: 'Bumi' },
      { q: 'Planet terbesar di tata surya adalah?', options: ['Saturnus', 'Jupiter', 'Uranus', 'Bumi'], answer: 'Jupiter' },
      { q: 'Pusat tata surya kita adalah?', options: ['Bulan', 'Bintang', 'Matahari', 'Bumi'], answer: 'Matahari' }
    ]
  },
  {
    id: 'gk-hero', title: 'Pahlawan Kita', category: 'Pengetahuan Umum', 
    description: 'Mengenal tokoh sejarah bangsa.', icon: Trophy, color: 'emerald',
    questions: [
      { q: 'Siapa Bapak Proklamator Indonesia?', options: ['Soekarno', 'Hatta', 'Sudirman', 'Diponegoro'], answer: 'Soekarno' },
      { q: 'Pahlawan wanita dari Aceh adalah?', options: ['Kartini', 'Cut Nyak Dien', 'Dewi Sartika', 'Christina M. Tiahahu'], answer: 'Cut Nyak Dien' },
      { q: 'Pahlawan pendidikan Indonesia adalah?', options: ['Ki Hajar Dewantara', 'B.J. Habibie', 'Soekarno', 'Ahmad Dahlan'], answer: 'Ki Hajar Dewantara' }
    ]
  },
  {
    id: 'gk-music', title: 'Alat Musik Tradisional', category: 'Pengetahuan Umum', 
    description: 'Kenali alat musik daerah.', icon: Music, color: 'emerald',
    questions: [
      { q: 'Alat musik Angklung berasal dari provinsi?', options: ['Jawa Tengah', 'Jawa Barat', 'Bali', 'DKI Jakarta'], answer: 'Jawa Barat' },
      { q: 'Sasando adalah alat musik petik dari?', options: ['NTT', 'Papua', 'Maluku', 'Sulawesi Utara'], answer: 'NTT' },
      { q: 'Alat musik Kolintang dipukul menggunakan?', options: ['Tangan', 'Besi', 'Kayu', 'Bambu'], answer: 'Kayu' }
    ]
  },

  // Kategori: LOGIKA & MEMORI
  {
    id: 'logic-heavy', title: 'Mana Lebih Berat?', category: 'Logika', 
    description: 'Gunakan logikamu untuk menebak.', icon: Brain, color: 'amber',
    questions: [
      { q: 'Mana yang lebih berat: 1 Kg Besi atau 1 Kg Kapas?', options: ['Besi', 'Kapas', 'Sama Berat', 'Tidak Tahu'], answer: 'Sama Berat' },
      { q: 'Mana yang lebih berat: Gajah atau Kucing?', options: ['Gajah', 'Kucing', 'Sama Berat', 'Tikus'], answer: 'Gajah' },
      { q: 'Mana yang biasanya lebih berat di dalam tas sekolah?', options: ['Pensil', 'Buku Paket', 'Penghapus', 'Penggaris'], answer: 'Buku Paket' }
    ]
  },
  {
    id: 'logic-diff', title: 'Cari yang Beda', category: 'Logika', 
    description: 'Temukan satu yang tidak termasuk kelompoknya.', icon: Eye, color: 'amber',
    questions: [
      { q: 'Mana yang BUKAN kendaraan darat?', options: ['Mobil', 'Motor', 'Kereta', 'Kapal Laut'], answer: 'Kapal Laut' },
      { q: 'Mana yang BUKAN warna pelangi?', options: ['Merah', 'Kuning', 'Hitam', 'Hijau'], answer: 'Hitam' },
      { q: 'Mana yang BUKAN jenis unggas?', options: ['Ayam', 'Bebek', 'Kelinci', 'Burung'], answer: 'Kelinci' }
    ]
  },
  {
    id: 'logic-time', title: 'Urutan Waktu', category: 'Logika', 
    description: 'Pahami konsep urutan peristiwa.', icon: Clock, color: 'amber',
    questions: [
      { q: 'Apa yang terjadi sebelum siang hari?', options: ['Malam', 'Pagi', 'Sore', 'Petang'], answer: 'Pagi' },
      { q: 'Jika hari ini Senin, besok hari?', options: ['Minggu', 'Selasa', 'Rabu', 'Kamis'], answer: 'Selasa' },
      { q: 'Urutan yang benar: Biji - ... - Pohon', options: ['Tunas', 'Buah', 'Daun', 'Akar'], answer: 'Tunas' }
    ]
  },
  {
    id: 'logic-class', title: 'Kelompok Benda', category: 'Logika', 
    description: 'Kelompokkan benda sesuai fungsinya.', icon: Puzzle, color: 'amber',
    questions: [
      { q: 'Sendok, Garpu, dan Piring termasuk alat?', options: ['Mandi', 'Makan', 'Tulis', 'Tidur'], answer: 'Makan' },
      { q: 'Sabun, Sampo, Sikat Gigi termasuk alat?', options: ['Mandi', 'Makan', 'Dapur', 'Sekolah'], answer: 'Mandi' },
      { q: 'Pensil, Buku, Penghapus termasuk alat?', options: ['Bermain', 'Tidur', 'Tulis/Sekolah', 'Masak'], answer: 'Tulis/Sekolah' }
    ]
  }
];

// --- PALET WARNA ---
const colorMap = {
  sky: { bg: 'bg-sky-50', card: 'bg-sky-100', text: 'text-sky-700', border: 'border-sky-200', hover: 'hover:bg-sky-200', btn: 'bg-sky-500 hover:bg-sky-600 text-white' },
  rose: { bg: 'bg-rose-50', card: 'bg-rose-100', text: 'text-rose-700', border: 'border-rose-200', hover: 'hover:bg-rose-200', btn: 'bg-rose-500 hover:bg-rose-600 text-white' },
  emerald: { bg: 'bg-emerald-50', card: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200', hover: 'hover:bg-emerald-200', btn: 'bg-emerald-500 hover:bg-emerald-600 text-white' },
  amber: { bg: 'bg-amber-50', card: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200', hover: 'hover:bg-amber-200', btn: 'bg-amber-500 hover:bg-amber-600 text-white' }
};

// --- KOMPONEN UTAMA ---
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home'); // 'home', 'playing', 'result'
  const [activeGame, setActiveGame] = useState(null);
  const [finalScore, setFinalScore] = useState(0);

  const startGame = (game) => {
    setActiveGame(game);
    setCurrentScreen('playing');
  };

  const finishGame = (score) => {
    setFinalScore(score);
    setCurrentScreen('result');
  };

  const goHome = () => {
    setCurrentScreen('home');
    setActiveGame(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header Utama */}
      {currentScreen === 'home' && (
        <header className="pt-12 pb-8 px-6 text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-sm mb-4">
            <Gamepad2 className="w-8 h-8 text-indigo-500 mr-2" />
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 tracking-tight">
              Dunia Pintar
            </h1>
          </div>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Pilih game edukasi favoritmu! Belajar jadi lebih seru dan menyenangkan.
          </p>
        </header>
      )}

      {/* Konten Berdasarkan State */}
      <main className="px-4 pb-20 max-w-6xl mx-auto">
        {currentScreen === 'home' && <HomeGrid onSelectGame={startGame} />}
        
        {currentScreen === 'playing' && activeGame && (
          <GameEngine 
            game={activeGame} 
            onFinish={finishGame} 
            onBack={goHome} 
          />
        )}
        
        {currentScreen === 'result' && activeGame && (
          <ResultScreen 
            game={activeGame} 
            score={finalScore} 
            total={activeGame.questions.length}
            onHome={goHome} 
            onReplay={() => startGame(activeGame)} 
          />
        )}
      </main>
    </div>
  );
}

// --- KOMPONEN HOME GRID ---
function HomeGrid({ onSelectGame }) {
  // Mengelompokkan game berdasarkan kategori untuk UI jika diperlukan, 
  // tapi grid sederhana lebih rapi untuk 20 item.
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {GAMES_DATA.map((game) => {
        const theme = colorMap[game.color];
        const Icon = game.icon;
        
        return (
          <div 
            key={game.id}
            onClick={() => onSelectGame(game)}
            className="group relative bg-white rounded-3xl p-6 cursor-pointer border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center overflow-hidden"
          >
            {/* Background Blob Effect */}
            <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20 transition-transform duration-500 group-hover:scale-150 ${theme.bg}`}></div>
            
            <div className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${theme.card} ${theme.text}`}>
              <Icon className="w-8 h-8" />
            </div>
            
            <div className="relative z-10 space-y-2 flex-grow">
              <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-full ${theme.bg} ${theme.text}`}>
                {game.category}
              </span>
              <h3 className="text-lg font-bold text-slate-700 leading-tight">
                {game.title}
              </h3>
              <p className="text-sm text-slate-500 line-clamp-2">
                {game.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// --- KOMPONEN GAME ENGINE ---
function GameEngine({ game, onFinish, onBack }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null); // { isCorrect: boolean, selectedOpt: string }
  const [isLocked, setIsLocked] = useState(false);

  const theme = colorMap[game.color];
  const totalQuestions = game.questions.length;
  const question = game.questions[currentIdx];

  // Acak opsi jawaban saat mounting soal baru
  const [shuffledOptions, setShuffledOptions] = useState([]);
  
  useEffect(() => {
    // Basic shuffle
    const shuffled = [...question.options].sort(() => Math.random() - 0.5);
    setShuffledOptions(shuffled);
  }, [currentIdx, question]);

  const handleAnswer = (selectedOption) => {
    if (isLocked) return;
    setIsLocked(true);

    const isCorrect = selectedOption === question.answer;
    
    setFeedback({ isCorrect, selectedOpt: selectedOption });
    if (isCorrect) setScore(prev => prev + 1);

    // Lanjut ke soal berikutnya setelah delay
    setTimeout(() => {
      if (currentIdx + 1 < totalQuestions) {
        setCurrentIdx(prev => prev + 1);
        setFeedback(null);
        setIsLocked(false);
      } else {
        onFinish(score + (isCorrect ? 1 : 0));
      }
    }, 1500);
  };

  const progressPercent = ((currentIdx) / totalQuestions) * 100;

  return (
    <div className="max-w-2xl mx-auto w-full bg-white rounded-3xl shadow-lg overflow-hidden border border-slate-100">
      {/* Header In-Game */}
      <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-50">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline text-sm font-medium">Kembali</span>
        </button>
        
        <div className="flex items-center gap-3">
          <div className={`p-1.5 rounded-lg ${theme.card} ${theme.text}`}>
            <game.icon className="w-5 h-5" />
          </div>
          <h2 className="font-bold text-slate-700">{game.title}</h2>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Skor</span>
          <span className={`text-lg font-black ${theme.text}`}>{score}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-slate-100">
        <div 
          className={`h-full ${theme.btn} transition-all duration-500 ease-out`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Area Soal */}
      <div className="p-6 sm:p-10 text-center min-h-[400px] flex flex-col">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-xs font-bold tracking-wider">
            Soal {currentIdx + 1} dari {totalQuestions}
          </span>
        </div>
        
        <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 leading-snug mb-10 flex-grow flex items-center justify-center">
          {question.q}
        </h3>

        {/* Grid Pilihan Jawaban */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {shuffledOptions.map((opt, idx) => {
            // Logika Warna Tombol saat feedback
            let btnClass = "bg-white text-slate-700 border-2 border-slate-100 hover:border-slate-300 hover:bg-slate-50 active:scale-95";
            let IconFeedback = null;
            
            if (feedback) {
              if (opt === question.answer) {
                // Jawaban benar disorot hijau
                btnClass = "bg-emerald-100 border-emerald-500 text-emerald-800";
                IconFeedback = <CheckCircle2 className="w-6 h-6 text-emerald-600 absolute right-4" />;
              } else if (opt === feedback.selectedOpt && !feedback.isCorrect) {
                // Jawaban salah disorot merah
                btnClass = "bg-rose-100 border-rose-500 text-rose-800";
                IconFeedback = <XCircle className="w-6 h-6 text-rose-600 absolute right-4" />;
              } else {
                // Pilihan lain diredupkan
                btnClass = "bg-slate-50 text-slate-400 border-slate-100 opacity-50";
              }
            }

            return (
              <button
                key={idx}
                disabled={isLocked}
                onClick={() => handleAnswer(opt)}
                className={`relative px-6 py-4 rounded-2xl text-lg font-bold transition-all duration-200 flex items-center justify-center shadow-sm ${btnClass}`}
              >
                {opt}
                {IconFeedback}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// --- KOMPONEN HASIL ---
function ResultScreen({ game, score, total, onHome, onReplay }) {
  const theme = colorMap[game.color];
  const percentage = Math.round((score / total) * 100);
  
  let message = "";
  if (percentage === 100) message = "Luar Biasa! Sempurna!";
  else if (percentage >= 60) message = "Kerja Bagus! Hebat!";
  else message = "Ayo Coba Lagi! Pasti Bisa!";

  return (
    <div className="max-w-md mx-auto w-full bg-white rounded-3xl shadow-xl overflow-hidden text-center border border-slate-100 p-8 sm:p-12 relative">
      
      {/* Confetti decoration */}
      <div className={`absolute top-0 left-0 w-full h-32 opacity-10 bg-gradient-to-b from-${game.color}-400 to-transparent`}></div>

      <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6 relative z-10 ${theme.card} ${theme.text}`}>
        <Trophy className="w-12 h-12" />
      </div>

      <h2 className="text-3xl font-black text-slate-800 mb-2">{message}</h2>
      <p className="text-slate-500 font-medium mb-8">Kamu telah menyelesaikan {game.title}</p>

      <div className="bg-slate-50 rounded-3xl p-6 mb-8 border border-slate-100">
        <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mb-1">Skor Akhir</p>
        <div className="flex items-end justify-center gap-2">
          <span className={`text-6xl font-black ${theme.text}`}>{score}</span>
          <span className="text-2xl text-slate-400 font-bold mb-2">/ {total}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={onReplay}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold transition-all active:scale-95 shadow-md ${theme.btn}`}
        >
          Main Lagi
        </button>
        <button 
          onClick={onHome}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold bg-white text-slate-700 border-2 border-slate-200 hover:bg-slate-50 transition-all active:scale-95"
        >
          Menu Utama
        </button>
      </div>
    </div>
  );
}