<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 12:08:23
 * @LastEditTime: 2019-09-06 12:55:09
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="search">
    <div>
      <Search :type="category" :placeholder="placeholder" />
    </div>
  </div>
</template>

<script>
import Search from "@/components/music/search/Search.vue";
export default {
  name: "SearchXX",
  data() {
    return {
      // category: "song",
      category: "",
      placeholder: "歌名、歌手"
    };
  },

  created() {
    // 导航完成之后获取
    this.getCategory();
  },

  methods: {
    getCategory() {
      // console.log(this.$route.query.category);
      this.category = this.$route.query.category;
    }
  },

  components: {
    Search
  }
};
</script>

<style scoped>
.search {
  width: 100vw;
  height: 100vh;
}
</style>
