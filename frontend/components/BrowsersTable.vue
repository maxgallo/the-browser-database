<template>
  <div>
    <h1>Table</h1>
    <el-table :data="browsersData" height="700" style="width: 100%">
      <el-table-column prop="releaseDate" label="Date" width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        :filters="uniqueBrowserNames"
        :filter-method="filterHandler"
        label="Browser Name"
        width="140"
      >
      </el-table-column>
      <el-table-column
        prop="version"
        sortable
        :sort-method="semverCompare('version')"
        label="Browser Version"
        width="160"
      >
      </el-table-column>
      <el-table-column
        prop="engineName"
        :filters="uniqueEngineNames"
        :filter-method="filterHandler"
        label="Engine Name"
        width="130"
      >
      </el-table-column>
      <el-table-column
        prop="engineVersion"
        sortable
        :sort-method="semverCompare('engineVersion')"
        label="Engine Version"
        width="150"
      >
      </el-table-column>
      <el-table-column prop="jsEngineName"
        :filters="uniqueJsEngineNames"
        :filter-method="filterHandler"
        label="JS Engine Name" width="180">
      </el-table-column>
      <el-table-column
        prop="jsEngineVersion"
        sortable
        :sort-method="semverCompare('jsEngineVersion')"
        label="JS Engine Version"
        width="180"
      >
      </el-table-column>
      <el-table-column prop="basedOn" label="Based On" width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
function getUniqueProperties(arrayOfObjects, propertyName) {
  return arrayOfObjects.reduce((acc, arrayEntry) => {
    if (!acc.includes(arrayEntry[propertyName])) {
      acc.push(arrayEntry[propertyName])
    }
    return acc
  }, [])
}

const getFilter = text => ({
  text,
  value: text
})

export default {
  props: ['browsersData'],
  computed: {
    uniqueBrowserNames() {
      return getUniqueProperties(this.browsersData, 'name').map(getFilter)
    },
    uniqueEngineNames() {
      return getUniqueProperties(this.browsersData, 'engineName').map(getFilter)
    },
    uniqueJsEngineNames() {
      return getUniqueProperties(this.browsersData, 'jsEngineName').map(getFilter)
    }
  },
  methods: {
    resetDateFilter() {
      this.$refs.filterTable.clearFilter('date')
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter()
    },
    formatter(row, column) {
      return row.address
    },
    filterTag(value, row) {
      return row.tag === value
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    semverCompare(propertyName) {
      return (x, y, factor = 1) => {
        const xValue = x[propertyName]
        const yValue = y[propertyName]

        const [majorX, minorX, patchX] = xValue
          .split('.')
          .map(parseFloat)
          .map(x => (isNaN(x) ? 0 : x))

        const [majorY, minorY, patchY] = yValue
          .split('.')
          .map(parseFloat)
          .map(x => (isNaN(x) ? 0 : x))

        if (majorX !== majorY) {
          return (majorX - majorY) * factor
        }

        if (minorX !== minorY) {
          return (minorX - minorY) * factor
        }

        return (patchX - patchY) * factor
      }
    }
  }
}
</script>
