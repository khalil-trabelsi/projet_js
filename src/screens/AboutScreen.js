const AboutScreen = {
  render: async () => {
    return `
        <div class="about">
        <section class="landing">
<div class="container">
  <div class="landing-info">
    <h1>Bienvenue sur FilmFlix</h1>
    <p>
      Nous sommes ravis de vous présenter notre plateforme de présentation
      de films et de séries  en ligne. Avec notre site web, vous
      pouvez découvrir des milliers de titres...
    </p>
  </div>
  <div class="image">
    <img src="/imgs/landing-image.png" alt="" />
  </div>
</div>
<a href="" class="go-down">
  <i class="fas fa-angle-double-down fa-2x"></i>
</a>
</section> 
        <main class="main" id="project">
        <div class="container">
          <table>
            <thead>
              <tr>
                <th colspan="4">Projet : Netflix Clone</th>
                <th>Année universitaire</th>
              </tr>
            </thead>
            <tbody>
              <tr class="release">
                <th rowspan="2">Réalisé par</th>
                <td>khalil</td>
                <td colspan="4" rowspan="4">2022/2023</td>
              </tr>
              <tr class="sub-release">
                <td>TRABELSI</td>
              </tr>
              <tr class="formation">
                <th rowspan="4">Formation</th>
                <td rowspan="">Informatique</td>
              </tr>
            </tbody>
            <tfoot>
              <th rowspan="2">Date</th>
              <td colspan="4" rowspan="2"><span id="dateDay">11-05-2023</span></td>
            </tfoot>
          </table>
        </div>
      </main>
      <section  class="descrp">
        <h2 class="main-title">Description Du Projet</h2>
        <div class="container">
          <div class="image">
            <img src="/imgs/work-steps.png" alt="">
          </div>
          <p> Le site est facile à naviguer et agréable à regarder. 
          Il fournit des informations détaillées sur les films, y compris les dates de sortie, les acteurs, les critiques, les analyses et les bande-annonce. 
          Adapté à l’utilisation par ordinateur ainsi que pour le téléphone.<br />
           Le site est facile à utiliser. Les interfaces sont conviviales, simples, ergonomiques, et adaptées à l’utilisateur.<br />
          Le site est performant à travers ses fonctionnalités et répond à toutes les exigences de l’utilisateur d’une manière optimale.
          Le site web fournit une expérience de qualité pour les visiteurs, avec des fonctionnalités avancées telles que des recommandations personnalisées, des critiques approfondies, des analyses de tendances et des statistiques sur les films. Le site est facile à naviguer, esthétique et intuitif. Ce site web doit contribuer à la promotion de l'industrie cinématographique en mettant en valeur les créateurs et acteurs de ces films.
        
        </div>
     </section>

        </div>
        
        `
  },
  after_render: async () => {

  }
}
export default AboutScreen;
