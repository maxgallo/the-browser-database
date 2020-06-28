<template>
  <div class="container">
    <browsers-table :browsers-data="browsersData"/>
  </div>
</template>

<script>
import BrowsersTable from '~/components/BrowsersTable.vue'
import axios from 'axios'

export default {
  components: {
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
