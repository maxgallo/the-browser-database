<template>
  <div class="container">
    <browsers-table :browsers-data="browsersData"/>
  </div>
</template>

<script>
import BrowsersTable from '~/components/BrowsersTable.vue'

export default {
  components: {
    BrowsersTable
  },
  asyncData({ params }) {
    const chromeData = require('../../data/chrome.json')
    const edgeData = require('../../data/edge.json')
    const operaData = require('../../data/opera.json')
    const safariData = require('../../data/safari.json')
    const firefoxData = require('../../data/firefox.json')

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
