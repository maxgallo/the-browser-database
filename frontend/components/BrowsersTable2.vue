<template>
  <div class="Wrapper">
    <div class="AvailableFields">
      <h2> Available Fields </h2>
      <ul>
        <li v-for="field in availableFields">
          {{ field }}
          <button v-if="!visibleFields.includes(field)" v-on:click="showField(field)"> Add </button>
        </li>
      </ul>
    </div>
    <table class="BrowsersTable" cellspacing="0" cellpadding="0" >
      <thead>
        <tr>
          <td></td>
          <td v-for="visibleField in visibleFields">
            {{ visibleField }}
            <button v-on:click="hideField(visibleField)">x</button>
          </td>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, index) in browsersData">
          <tr :class="{ open: openRows.includes(index) }">
            <td>
                <svg v-on:click="toggleRow($event, index)" v-if="!openRows.includes(index)" class="euiIcon euiIcon--small" focusable="false" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" viewBox="0 0 16 16"><defs><path id="arrow_right-a" d="M13.069 5.157L8.384 9.768a.546.546 0 0 1-.768 0L2.93 5.158a.552.552 0 0 0-.771 0 .53.53 0 0 0 0 .759l4.684 4.61c.641.631 1.672.63 2.312 0l4.684-4.61a.53.53 0 0 0 0-.76.552.552 0 0 0-.771 0z"></path></defs><use fill-rule="nonzero" transform="matrix(0 1 1 0 0 0)" xlink:href="#arrow_right-a"></use></svg>
                <svg v-on:click="toggleRow($event, index)" v-if="openRows.includes(index)" class="euiIcon euiIcon--small" focusable="false" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" viewBox="0 0 16 16"><defs><path id="arrow_down-a" d="M13.069 5.157L8.384 9.768a.546.546 0 0 1-.768 0L2.93 5.158a.552.552 0 0 0-.771 0 .53.53 0 0 0 0 .759l4.684 4.61c.641.631 1.672.63 2.312 0l4.684-4.61a.53.53 0 0 0 0-.76.552.552 0 0 0-.771 0z"></path></defs><use fill-rule="nonzero" xlink:href="#arrow_down-a"></use></svg>
            </td>
            <td v-for="field in visibleFields">
              {{ item[field] }}
            </td>
          </tr>
          <tr v-if="openRows.includes(index)">
              <td :colspan="visibleFields.length + 1"><pre class="code">{{ JSON.stringify(item, null, 2) }}</pre></td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style>
.Wrapper {
  display: flex;
}

.AvailableFields {
  flex: 0 0 20%;
  padding: 10px;
  background-color: #eeeeee;
}

.AvailableFieldsT {
  font-size: 24px;
}

.BrowsersTable {
  width: 84%;
  font-family: "Roboto Mono", Consolas, Menlo, Courier, monospace;
}

.BrowsersTable > thead > tr > td {
  padding: 10px;
}
.BrowsersTable > tbody > tr > td {
  padding: 10px;
  /* border-bottom: 1px solid #292F36 */
  border-bottom: 1px solid #D3DAE6;
  font-size: 12px;
}

.BrowsersTable > tbody > tr.open > td {
    border-bottom: none;
}

.BrowsersTable > tbody > tr > td:first-child {
  cursor: pointer;
}

.code {
  padding: 10px;
  background-color: #292F36;
  color: #F7FFF7;
}
</style>

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
});

export default {
  props: ['browsersData'],
  data: () => ({
    openRows: [],
    visibleFields: [
      'name',
      'version',
      'release_date',
      'engine',
    ],
    availableFields: [
      'name',
      'version',
      'status',
      'release_date',
      'engine',
      'engine_version',
      'release_notes',
    ]
  }),
  computed: {
    OLD_availableFields() {
      return [...Object.keys(this.browsersData[0]).map( field => ({
        name: field,
      }))]
    },
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
    toggleRow(event, index) {
      const openRowsIndex = this.openRows.indexOf(index);
      if (openRowsIndex >= 0) {
        console.log('hide', index);
        //remove
        this.openRows.splice(openRowsIndex, 1);
        return;
      }

      // add
      console.log('show', index);
      this.openRows.push(index);
    },
    showField(field) {
      this.visibleFields.push(field)
    },
    hideField(field) {
      this.visibleFields = this.visibleFields.filter(x => x !== field);
    },
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
