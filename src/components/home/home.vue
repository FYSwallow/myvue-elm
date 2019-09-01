<template>
  <div >
    <!-- 头部 -->
    <v-header :seller="seller"></v-header>
     <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">
          商品
        </router-link>

      </div>
      <div class="tab-item">
        <router-link to="/ratings">
          评论
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">
          商家
        </router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Header from '@/components/header/header'
import data from '@/assets/json/data.json'
export default {
  data() {
    return {
      seller: {},
    }
  },
  created() {
    this.seller = data.seller
    console.log(this.seller)
  },
  components: {
    'v-header': Header
  }
}
</script>

<style lang="scss" scoped>
.tab {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border: 1px solid rgba(7,17,27,0.1);
  .tab-item {
    flex: 1;
    text-align: center;
    a {
        display: block;
        font-size: 14px;
        &.active {
        color: rgb(240, 20, 20);
        }
    }
  }
  
}
</style>
