<script setup>
import { computed } from 'vue';


const props = defineProps({
    vols:{
        type:Array,
        default:null
    },
    separator: {
        type: String,
        default: "/",
    }
})

const values = computed(()=>props?.vols && Array.isArray(props.vols) ? props.vols.filter((v)=>v && v.trim().length) : [] )
const len = computed(()=>values.value.length )
</script>
<script >
export default {
    name:'LotoCell'
}
</script>
<template>
  <div class="el-loto-table-cell">
    <template v-for="(v,idx) in values">
        <span v-if="v.trim().length" :key="idx">
            {{ v.trim() }}
            <template v-if="v.trim().length && idx < len-1">
                {{ separator }}
            </template>
        </span>
    </template>
  </div>
</template>

<style scoped lang="scss"></style>
