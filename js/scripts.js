// --------------------------------------------------------
// Função Principal para iniciar todas as funcionalidades
// --------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. FUNÇÃO: MENU MOBILE (ABRIR/FECHAR) ---
    const menuButton = document.getElementById('menu-toggle-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIconOpen = document.getElementById('menu-icon-open');
    const menuIconClose = document.getElementById('menu-icon-close');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            // Primeiro, abre ou fecha o menu
            mobileMenu.classList.toggle('open');

            // AGORA, verificamos se o menu está aberto para decidir qual icone mostrar
            const isMenuOpen = mobileMenu.classList.contains('open');

            if (isMenuOpen) {
                // Se o menu está ABERTO, mostre o ícone de FECHAR (o "X")
                menuIconOpen.classList.add('hidden');
                menuIconClose.classList.remove('hidden');
            } else {
                // Se o menu está FECHADO, mostre o ícone de ABRIR (os 3 traços)
                menuIconOpen.classList.remove('hidden');
                menuIconClose.classList.add('hidden');
            }
        });

        // Fecha o menu ao clicar em um link
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                // Apenas remove a classe 'open' para fechar o menu
                mobileMenu.classList.remove('open');
                
                // E garante que o ícone correto seja exibido (o de abrir)
                menuIconOpen.classList.remove('hidden');
                menuIconClose.classList.add('hidden');
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    // Verifica se o link é para uma âncora na própria página
    if (this.hash !== "") {
      // Previne o "pulo" padrão
      e.preventDefault();

      const targetId = this.hash;
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Calcula a posição do header (para não cobrir o título da seção)
        const headerOffset = document.querySelector('header').offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset - 10; // 10px de margem

        // Executa a rolagem suave
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  });
});

    // --- 2. FUNÇÃO: FAQ (ACCORDION) e Rolagem Suave ---
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-toggle-icon');

        if (question && answer && icon) {
            question.addEventListener('click', () => {
                const isItemOpen = answer.classList.toggle('open');

                // Fecha todos os outros itens FAQ abertos (comportamento de accordion)
                document.querySelectorAll('.faq-answer.open').forEach(openAnswer => {
                    if (openAnswer !== answer) {
                        openAnswer.classList.remove('open');
                        openAnswer.previousElementSibling.querySelector('.faq-toggle-icon').classList.remove('open');
                    }
                });

                // Abre ou fecha o item clicado e gira a seta
                icon.classList.toggle('open');
            });
        }
    });

    // --- 3. FUNÇÃO: CARROSSEL (COM SWIPER.JS) ---

  // Verificamos se a classe Swiper existe (carregada do CDN)
  if (typeof Swiper !== 'undefined') {
    
    // --- LÓGICA PARA COPIAR A COR DO BOTÃO ---
    let scheduleButton = null;
    // Cor padrão (fallback) caso o botão não seja encontrado
    let buttonBgClass = 'bg-primary';
    // Cor dos pontos inativos (do seu tema)
    let inactiveDotColor = 'bg-muted';

    // 1. Encontra o botão "Agende um Horário"
    document.querySelectorAll('button').forEach(button => {
        if (button.textContent.includes('Agende um Horário')) {
            scheduleButton = button;
        }
    });

    // 2. Extrai a classe de cor de fundo (ex: "bg-caramel-500")
    if (scheduleButton) {
        const buttonClasses = Array.from(scheduleButton.classList);
        // Procura uma classe que começa com "bg-" mas não é de "hover"
        const bgClass = buttonClasses.find(cls => cls.startsWith('bg-') && !cls.includes('hover:'));
        if (bgClass) {
            buttonBgClass = bgClass; // Encontrou! (ex: "bg-caramel-500")
        }
    }
    // --- FIM DA LÓGICA DE COR ---


    const swiper = new Swiper('.instagram-carousel', {
      // --- Loop Infinito ---
      loop: true,
      
      // --- Velocidade da transição ---
      speed: 1000, 

      // --- Autoplay (4 segundos) ---
      autoplay: {
        delay: 4000,
        disableOnInteraction: true, 
        pauseOnMouseEnter: true, 
      },

      // --- Navegação (Setas) ---
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // --- Paginação (Dots) ---
      pagination: {
        el: '.swiper-pagination', // Aponta para o div que alteramos
        clickable: true,
        
        // --- Renderiza os dots com o design e cor dinâmica ---
        renderBullet: function (index, className) {
          
          // Estilo Padrão (Inativo)
          let bulletClasses = `w-2 h-2 ${inactiveDotColor} rounded-full mx-1`;
          
          // 'className' já inclui 'swiper-pagination-bullet'
          // A classe 'swiper-pagination-bullet-active' é adicionada pelo Swiper
          if (className.includes('swiper-pagination-bullet-active')) {
            
            // Estilo Ativo (como na sua imagem image_b07fe6.png)
            // Usa a classe de cor que pegamos do botão
            bulletClasses = `w-6 h-2 ${buttonBgClass} rounded-full mx-1`; 
          }
          
          // Retorna o HTML da bolinha com as classes do Tailwind e uma transição
          return '<span class="' + className + ' ' + bulletClasses + ' transition-all duration-300"></span>';
        },
      },

      // --- Responsividade (Slides por View) ---
      slidesPerView: 1, 
      spaceBetween: 16, 
      // Centraliza o slide ativo no mobile (fica mais bonito)
      centeredSlides: true, 

      breakpoints: {
        // >= 640px (sm)
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
          centeredSlides: false, // Desativa no tablet
        },
        // >= 1024px (lg)
        1024: {
          slidesPerView: 3,
          spaceBetween: 32,
          centeredSlides: false, // Desativa no desktop
        },
      },
    });
  } else {
    console.error('Swiper.js não foi carregado. Verifique a conexão e o link do CDN.');
  }


   
});

