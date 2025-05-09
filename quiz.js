document.addEventListener('DOMContentLoaded', function() {
  // Elemen-elemen quiz
  const startQuizBtn = document.getElementById('start-quiz-btn');
  const quizContent = document.getElementById('quiz-content');
  const quizResults = document.getElementById('quiz-results');
  const prevBtn = document.getElementById('prev-question');
  const nextBtn = document.getElementById('next-question');
  const submitBtn = document.getElementById('submit-quiz');
  const retakeBtn = document.getElementById('retake-quiz');
  const questions = document.querySelectorAll('.quiz-question');
  const resultsContainer = document.querySelector('.results-container');
  
  let currentQuestion = 1;
  const totalQuestions = questions.length;
  
  // Produk rekomendasi berdasarkan kombinasi jawaban
  const productRecommendations = {
    'kering-jerawat-low': {
      name: 'Paket Skincare Dasar untuk Kulit Kering',
      price: 'Rp185.000',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=300&q=80',
      description: 'Paket lengkap untuk kulit kering dengan masalah jerawat, cocok untuk budget terbatas.'
    },
    'kering-jerawat-medium': {
      name: 'Paket Premium untuk Kulit Kering Berjerawat',
      price: 'Rp350.000',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=300&q=80',
      description: 'Solusi premium untuk mengatasi jerawat pada kulit kering dengan bahan-bahan alami.'
    },
    // Tambahkan rekomendasi produk lainnya sesuai kombinasi jawaban
    'default': {
      name: 'Paket Skincare Dasar',
      price: 'Rp250.000',
      image: 'https://images.unsplash.com/photo-1567721913486-6585f069b332?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=300&q=80',
      description: 'Paket skincare dasar yang cocok untuk semua jenis kulit.'
    }
  };
  
  // Mulai quiz
  startQuizBtn.addEventListener('click', function() {
    startQuizBtn.classList.add('hidden');
    quizContent.classList.remove('hidden');
    showQuestion(currentQuestion);
  });
  
  // Tombol sebelumnya
  prevBtn.addEventListener('click', function() {
    if (currentQuestion > 1) {
      currentQuestion--;
      showQuestion(currentQuestion);
    }
  });
  
  // Tombol selanjutnya
  nextBtn.addEventListener('click', function() {
    if (currentQuestion < totalQuestions) {
      currentQuestion++;
      showQuestion(currentQuestion);
    }
  });
  
  // Submit quiz
  submitBtn.addEventListener('click', function() {
    showResults();
  });
  
  // Ambil quiz lagi
  retakeBtn.addEventListener('click', function() {
    resetQuiz();
  });
  
  // Fungsi untuk menampilkan pertanyaan
  function showQuestion(questionNumber) {
    // Sembunyikan semua pertanyaan
    questions.forEach(question => {
      question.classList.add('hidden');
    });
    
    // Tampilkan pertanyaan saat ini
    document.querySelector(`.quiz-question[data-question="${questionNumber}"]`).classList.remove('hidden');
    
    // Update tombol navigasi
    prevBtn.disabled = (questionNumber === 1);
    
    if (questionNumber === totalQuestions) {
      nextBtn.classList.add('hidden');
      submitBtn.classList.remove('hidden');
    } else {
      nextBtn.classList.remove('hidden');
      submitBtn.classList.add('hidden');
    }
  }
  
  // Fungsi untuk menampilkan hasil
  function showResults() {
    // Dapatkan jawaban
    const skinType = document.querySelector('input[name="skin-type"]:checked')?.value || 'normal';
    const skinConcern = document.querySelector('input[name="skin-concern"]:checked')?.value || 'kusam';
    const frequency = document.querySelector('input[name="frequency"]:checked')?.value || 'rutin';
    const texture = document.querySelector('input[name="texture"]:checked')?.value || 'krim';
    const ingredients = document.querySelector('input[name="ingredients"]:checked')?.value || 'tidak-peduli';
    const budget = document.querySelector('input[name="budget"]:checked')?.value || 'medium';
    
    // Buat key untuk rekomendasi produk
    // Gunakan kombinasi jawaban yang paling relevan untuk rekomendasi
    let recommendationKey = `${skinType}-${skinConcern}-${budget}`;
    
    // Tambahkan logika untuk menyesuaikan rekomendasi berdasarkan preferensi tambahan
    if (skinType === 'kering' && texture === 'ringan') {
      // Jika kulit kering tapi preferensi tekstur ringan, berikan rekomendasi khusus
      recommendationKey = `${skinType}-${skinConcern}-${texture}-${budget}`;
    }
    
    if (skinConcern === 'jerawat' && ingredients === 'alami') {
      // Jika masalah jerawat tapi ingin bahan alami, berikan rekomendasi khusus
      recommendationKey = `${skinType}-${skinConcern}-${ingredients}-${budget}`;
    }
    
    // Dapatkan rekomendasi produk
    const recommendation = productRecommendations[recommendationKey] || productRecommendations['default'];
    
    // Tambahkan informasi tambahan berdasarkan frekuensi penggunaan
    let usageAdvice = '';
    if (frequency === 'jarang') {
      usageAdvice = '<p class="usage-advice">Untuk hasil optimal, tingkatkan frekuensi penggunaan produk secara bertahap.</p>';
    } else if (frequency === 'intensif') {
      usageAdvice = '<p class="usage-advice">Rutinitas intensif Anda sangat baik untuk kulit! Produk ini akan melengkapi perawatan Anda.</p>';
    }
    
    // Tampilkan hasil
    resultsContainer.innerHTML = `
      <div class="product-recommendation">
        <img src="${recommendation.image}" alt="${recommendation.name}">
        <h4>${recommendation.name}</h4>
        <p>${recommendation.description}</p>
        <div class="price">${recommendation.price}</div>
        ${usageAdvice}
        <a href="#" class="view-product">Lihat Produk</a>
      </div>
    `;
    
    // Sembunyikan konten quiz dan tampilkan hasil
    quizContent.classList.add('hidden');
    quizResults.classList.remove('hidden');
  }
  
  // Fungsi untuk reset quiz
  function resetQuiz() {
    // Reset jawaban
    document.querySelectorAll('input[type="radio"]').forEach(input => {
      input.checked = false;
    });
    
    // Reset pertanyaan
    currentQuestion = 1;
    
    // Sembunyikan hasil dan tampilkan konten quiz
    quizResults.classList.add('hidden');
    quizContent.classList.remove('hidden');
    
    // Tampilkan pertanyaan pertama
    showQuestion(currentQuestion);
  }
});