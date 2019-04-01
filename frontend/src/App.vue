<template>
  <div class="container text-center">
    <div class="row text-center">
        <div class="col-md-12">
            <ul class="nav nav-tabs">
                <router-link class="nav-item nav-link" exact
                active-class="active" tag="li" to="/" >Uploader</router-link>
                <router-link class="nav-item nav-link" exact active-class="active" tag="li" to="/find">Find</router-link>
                <router-link class="nav-item nav-link" exact
              active-class="active" tag="li" to="/creator" >Creator</router-link>
          </ul>
        </div>

    </div>
    <router-view />
  </div>
</template>

<style>
</style>
