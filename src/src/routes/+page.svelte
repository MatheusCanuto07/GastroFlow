<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation'; // ✅ Adicionado para redirecionamento programático

  onMount(async () => {
    const mobileBtn = document.getElementById('mobile_btn');
    const mobileMenu = document.getElementById('mobile_menu');

    if (mobileBtn && mobileMenu) {
      mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if (icon) icon.classList.toggle('fa-x');
      });
    }

    // Atualiza a navegação com IntersectionObserver
    const navItems = document.querySelectorAll('.nav-item');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('id');
          const navLink = document.querySelector(`.nav-item a[href="#${id}"]`);

          if (entry.isIntersecting && navLink?.parentElement) {
            navItems.forEach((item) => item.classList.remove('active'));
            navLink.parentElement.classList.add('active');
          }
        });
      },
      {
        threshold: 0.6 // só ativa quando 60% da seção estiver visível
      }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    // Ao clicar, rola suavemente e aguarda IntersectionObserver ativar
    document.querySelectorAll('.nav-item a').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = (event.currentTarget as HTMLAnchorElement).getAttribute('href')?.replace('#', '');
        const target = document.getElementById(targetId || '');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // ScrollReveal
    const ScrollReveal = (await import('scrollreveal')).default;
    const sr = ScrollReveal();

    sr.reveal('#cta', {
      origin: 'left',
      duration: 2000,
      distance: '20%'
    });

    sr.reveal('.dish', {
      origin: 'left',
      duration: 2000,
      distance: '20%'
    });

    sr.reveal('#testimonial_chef', {
      origin: 'left',
      duration: 1000,
      distance: '20%'
    });

    sr.reveal('.feedback', {
      origin: 'right',
      duration: 1000,
      distance: '20%'
    });

    sr.reveal('.pessoas', {
      origin: 'right',
      duration: 1000,
      distance: '20%'
    });
  });
</script>





<header>
  <nav id="navbar">

    <i class="fa-solid fa-thermometer" id="nav_logo">gastro flow</i>
   
    
    <ul id="nav_list">
      <li class="nav-item">
        <a href="#home">Início</a>
      </li>
      <li class="nav-item">
        <a href="#menu">O Sistema</a>
      </li>
      <li class="nav-item">
        <a href="#team">Nossa Equipe</a>
      </li>
    </ul>


    <!--
    <button class="btn-default">Faça Login Aqui</button>
    -->

   <a class="btn-default" href="/login">Faça Login Aqui</a>


    

    <button id="mobile_btn">
      <i class="fa-solid fa-bars"></i>
    </button>
  </nav>


  <div id="mobile_menu">
    <ul id="mobile_nav_list">
      <li class="nav-item">
        <a href="#home">Início</a>
      </li>
      <li class="nav-item">
        <a href="#menu">O Sistema</a>
      </li>
      <li class="nav-item">
        <a href="#team">Nossa Equipe</a>
      </li>
    </ul>
    <button class="btn-default" on:click={() => goto('/login')}>Faça Login Aqui</button>

  </div>
</header>

    <main id="content">
        <section id="home">
            <div class="shape"></div>
            <div id="cta">
                <h1 class="title">
                    O sistema por trás do
                    <span>Sabor</span>
                </h1>

                <p class="description">
                    Transforme sua produção artesanal com um toque de automação.
                </p>

                <form action="mailto:flowgastro@gmail.com?subject=Ajuda%20com%20o%20sistema&body=Olá%20equipe%20GastroFlow,%0D%0A%0D%0AEstou%20com%20a%20seguinte%20dúvida:%0D%0A" method="POST" enctype="text/plain">
                    <button class="btn-default">
                    Fale Conosco
                    </button>
                </form>
                
            </div>

            <div id="banner">
                <img src="/SEMFUNDO.png" alt="banner">
            </div>
        </section>

        <section id="menu">
            <h2 class="section-title">Sobre Nós</h2>
            <h3 class="section-subtitle">Conheça mais sobre o Gastro Flow</h3>

            <div id="dishes">
                <div class="dish">
                    <div class="dish-heart">
                        <i class="fa-solid fa-burger"></i>
                    </div>

                    <!-- <img src="src/images/dish.png" class="dish-image" alt="">
                  --> 
                    <h3 class="dish-title">
                       Gastro Flow
                    </h3>

                    <span class="dish-description">
                       Desenvolvidos por alunos da <strong>PUC Minas Contagem</strong>, o GastroFlow foi criado para facilitar a vida de quem tem um pequeno negócio e precisa manter o controle do que entra e sai do estoque. 
                      <br><br>Sabe aquela confusão com planilhas, anotações em caderno ou a dúvida se o produto já venceu? 
                      <br><strong>A gente resolve isso!</strong>
                    </span>
              

                </div>

                <div class="dish">
                    <div class="dish-heart">
                       <i class="fa-solid fa-hotdog"></i>
                    </div>
                  
                    <h3 class="dish-title">
                        o Sistema
                    </h3>

                    <span class="dish-description">
                       Nosso sistema ajuda você a organizar seus ingredientes, acompanhar as produções, saber o que está acabando e o que está perto de vencer. 
                       <br>Tudo de um jeito simples e uma tela fácil de usar. 
                       <br>Ele também registra receitas, mostra o que foi produzido e mantém tudo atualizado, sem dor de cabeça.
                       <br><br><strong>É a tecnologia aliada à rotina de quem vive da gastronomia artesanal.</strong>
                    </span>

                </div>

                <div class="dish">
                    <div class="dish-heart">
                        <i class="fa-solid fa-heart"></i>
                    </div>

                    <h3 class="dish-title">
                        Nosso Objetivo
                    </h3>

                    <span class="dish-description">
                        Nosso objetivo é ajudar você a ganhar tempo, economizar dinheiro e ter mais controle sobre o seu negócio, sem precisar se preocupar com a bagunça das planilhas e anotações. 
                        <br><br>Criado com base em estudos acadêmicos e práticas reais de mercado, o GastroFlow representa a união entre inovação, conhecimento e paixão por soluções que fazem a diferença.
                </div>

            </div>
        </section>


        <section id="team">
            <div id="team_content">
                <div id="teste">
                <h2 class="section-title"> Nossa Equipe</h2>
                <h3 class="section-subtitle">Conheça as pessoas por trás dos Sistema</h3>
                </div>
              

                <div id="pessoas">
                    <div class="pessoas">
                        <img src="/Barbara.png" class="pessoas-avatar" alt="">

                        <div class="pessoas-content">
                            <p>
                                Bárbara Xavier
                            </p>

                            <p>
                                Desenvolvedora Front-End
                            </p>
                        </div>
                    </div>

                    <div class="pessoas">
                        <img src="/Felipe.png" class="pessoas-avatar" alt="">

                        <div class="pessoas-content">
                            <p>
                                Felipe Fernandes
                            </p>
                            <p>
                               Projetista e Desenvolvedor
                            </p>
                        </div>
                    </div>
                    <div class="pessoas">
                        <img src="/icon_amarelo.png" class="pessoas-avatar" alt="">

                        <div class="pessoas-content">
                            <p>
                               Geovanna Miranda
                            </p>
                            <p>
                               UI/UX Design
                            </p>
                        </div>
                    </div>
                    <div class="pessoas">
                        <img src="/Guilherme.png" class="pessoas-avatar" alt="">

                        <div class="pessoas-content">
                            <p>
                                Guilherme Machado
                            </p>
                            <p>
                               Analista e Desenvolvedor Back-End
                            </p>
                        </div>
                    </div>
                    <div class="pessoas">
                        <img src="/Higor.png" class="pessoas-avatar" alt="">

                        <div class="pessoas-content">
                            <p>
                                Higor Antonio
                            </p>
                            <p>
                               Administrador de Banco de Dados
                            </p>
                        </div>
                    </div>
                    <div class="pessoas">
                        <img src="/icon_amarelo.png" class="pessoas-avatar" alt="">

                        <div class="pessoas-content">
                            <p>
                                Igor Pereira
                            </p>
                            <p>
                               Projetista
                            </p>
                        </div>
                    </div>

                     <div class="pessoas">
                        <img src="/Leni.png" class="pessoas-avatar" alt="">

                        <div class="pessoas-content">
                            <p>
                                Leni Rocha
                            </p>
                            <p>
                               Projetista e Desenvolvedora
                            </p>
                        </div>
                    </div>

                     <div class="pessoas">
                        <img src="/matheus.png" class="pessoas-avatar" alt="">

                        <div class="pessoas-content">
                            <p>
                                Matheus Canuto
                            </p>
                            <p>
                               Desenvolvedor Back-End
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
        
           
            
        <!-- 
        <section id="testimonials">
            <img src="src/images/chef.png" id="testimonial_chef" alt="">

            <div id="testimonials_content">
                <h2 class="section-title">
                    Depoimentos
                </h2>
                <h3 class="section-subtitle">
                    O que os clientes falam sobre nós
                </h3>

                <div id="feedbacks">
                    <div class="feedback">
                        <img src="src/images/avatar.png" class="feedback-avatar" alt="">

                        <div class="feedback-content">
                            <p>
                                Fulana de Tal
                                <span>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                </span>
                            </p>
                            <p>
                                "Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                Repellat voluptatibus cumque dolor ea est quae alias necessitatibus"
                            </p>
                        </div>
                    </div>

                    <div class="feedback">
                        <img src="src/images/avatar.png" class="feedback-avatar" alt="">

                        <div class="feedback-content">
                            <p>
                                Fulana de Tal
                                <span>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                </span>
                            </p>
                            <p>
                                "Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                Repellat voluptatibus cumque dolor ea est quae alias necessitatibus"
                            </p>
                        </div>
                    </div>
                </div>

                <button class="btn-default">
                    Ver mais avaliações
                </button>
            </div>
        </section>
        -->
       
    </main>



    <footer>
        <img src="/wave.svg" alt="">

        <div id="footer_items">
            <span id="copyright">
                &copy 2025 Equipe GastroFlow
            </span>


            <form action="mailto:flowgastro@gmail.com?subject=Ajuda%20com%20o%20sistema&body=Olá%20equipe%20GastroFlow,%0D%0A%0D%0AEstou%20com%20a%20seguinte%20dúvida:%0D%0A" method="POST" enctype="text/plain">
            <button class="btn-default">
                 Fale Conosco
             </button>
            </form>
            
        </div>
    </footer>


  
<style scoped>

</style>

