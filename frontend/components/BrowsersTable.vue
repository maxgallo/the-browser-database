<template>
  <div>
    <h1>Table</h1>
    <el-table :data="browsersData" height="700" style="width: 100%">
      <el-table-column prop="releaseDate" label="Date" width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        :filters="uniqueBrowserNames"
        :filter-method="filterHandler"
        label="Browser Name"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="version"
        sortable
        :sort-method="semverCompare"
        label="Browser Version"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="engineName"
        :filters="uniqueEngineNames"
        :filter-method="filterHandler"
        label="Engine Name"
        width="180"
      >
      </el-table-column>
      <el-table-column prop="engineVersion" label="Engine Version" width="180">
      </el-table-column>
      <el-table-column prop="jsEngineName" label="JS Engine Name" width="180">
      </el-table-column>
      <el-table-column
        prop="jsEngineVersion"
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
    semverCompare(xVersion, yVersion, factor = 1) {
      if (typeof xVersion !== 'string') {
        return -1;
      }

      const [majorX, minorX, patchX] = xVersion
        .split('.')
        .map(parseFloat)
        .map(x => (isNaN(x) ? 0 : x))
      const [majorY, minorY, patchY] = yVersion
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
</script>
