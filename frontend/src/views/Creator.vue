<template lang="html">
  <div class="component-wrapper">
      <!-- <img src="../assets/laptop.jpg" alt="laptop"> -->
      <div class="text">
          <h1>About me</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <h2>My skills</h2>
      </div>
      <div class="skills">
          <div class="skill">
              <img alt="Vue logo" src="../assets/logo.png" />
              <div class="description">
                  <h3>My knowledge about vue</h3>
                  <ul>
                      <li v-for="t in 3" :key="t">I started learn this 5 days ago</li>
                  </ul>
              </div>

          </div>
          <div class="skill">
              <img alt="Nodejs logo" src="../assets/nodejs.png" />
              <div class="description">
                  <h3>My knowledge about Nodejs</h3>
                  <ul>
                      <li v-for="t in 3" :key="t">I started learn this 5 days ago</li>
                  </ul>
              </div>

          </div>
          <div class="skill">
              <img alt="MySql logo" src="../assets/mysql.png" />
              <div class="description">
                  <h3>My knowledge about MySql</h3>
                  <ul>
                      <li v-for="t in 3" :key="t">{{t}}-I started learn this 5 days ago</li>
                  </ul>
              </div>

          </div>
          <div class="skill">
              <img alt="Angular logo" src="../assets/Angular.png" />
              <div class="description">
                  <h3>My knowledge about Angular</h3>
                  <ul>
                      <li v-for="t in 3" :key="t">{{t}}-I started learn this 4 months ago</li>
                  </ul>
              </div>

          </div>
          <div class="skill">
              <img alt="html5 logo" src="../assets/html5.png" />
              <div class="description">
                  <h3>My knowledge about html5</h3>
                  <ul>
                      <li v-for="t in 3" :key="t">{{t}}-I started learn this 7 months ago</li>
                  </ul>
              </div>

          </div>
          <div class="skill">
              <img alt="css3 logo" src="../assets/css3.png" />
              <div class="description">
                  <h3>My knowledge about css3</h3>
                  <ul>
                      <li v-for="t in 3" :key="t">{{t}}-I started learn this 7 months ago</li>
                  </ul>
              </div>

          </div>
      </div>
  </div>
</template>

<script>
  export default {
  }
</script>

<style scoped>
    .component-wrapper{
        width: 80%;
        margin: 50px auto;
        text-align: center;
        display: grid;
        grid-template-rows: auto;
    }
    .component-wrapper img{
        max-width: 100%;
    }
    .skills{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
    .skill{
        display: grid;
        grid-template-columns:1fr;
        justify-items:center;
    }
    .skill img{
        width: 100px;
        height: 100px;
    }
    .description h3{
        font-size: 22px;
    }
    .description li{
        font-size: 16px;
        list-style-type: none;
    }
    @media screen and (max-width: 768px ) {
        .skills{
            grid-template-columns: 1fr;
        }
    }
</style>
