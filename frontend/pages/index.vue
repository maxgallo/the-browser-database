<template>
  <div>
    <top-header />
    <div class="container">
      <browsers-table :browsers-data="browsersData"/>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import TopHeader from '~/components/TopHeader.vue';
import BrowsersTable from '~/components/BrowsersTable2.vue'
import axios from 'axios'

export default {
  components: {
    Logo,
    TopHeader,
    BrowsersTable
  },
  async asyncData({ params }) {
    const basePath = 'https://raw.githubusercontent.com/maxgallo/the-browser-database/master/data';

    const { data: chromeData } = await axios.get(`${basePath}/chrome.json`)
    const { data: edgeData } = await axios.get(`${basePath}/edge.json`)
    const { data: operaData } = await axios.get(`${basePath}/opera.json`)
    const { data: safariData } = await axios.get(`${basePath}/safari.json`)
    const { data: firefoxData } = await axios.get(`${basePath}/firefox.json`)

    const browsersData = [
      ...chromeData,
      ...edgeData,
      ...operaData,
      ...safariData,
      ...firefoxData
    ]
    return { browsersData };
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
