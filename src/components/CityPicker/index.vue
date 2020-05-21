<template>
  <div class="overflow-h">
    <el-row :gutter="10">
      <el-col :span="6" v-if="init.province">
        <el-select v-model="regionData.provinceVal" @change="getCityData">
          <el-option
            v-for="item in provinceData"
            :key="item.PROVINCE_CODE"
            :value="item.PROVINCE_CODE"
            :label="item.PROVINCE_NAME"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6" v-if="init.city">
        <el-select v-model="regionData.cityVal" @change="getAreaData">
          <el-option
            v-for="item in cityData"
            :key="item.CITY_CODE"
            :value="item.CITY_CODE"
            :label="item.CITY_NAME"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6" v-if="init.area">
        <el-select v-model="regionData.areaVal" @change="getStreetData">
          <el-option
            v-for="item in areaData"
            :key="item.AREA_CODE"
            :value="item.AREA_CODE"
            :label="item.AREA_NAME"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6" v-if="init.street">
        <el-select v-model="regionData.streetVal">
          <el-option
            v-for="item in streetData"
            :key="item.STREET_CODE"
            :value="item.STREET_CODE"
            :label="item.STREET_NAME"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { GetCityPicker } from "@/api/common";
export default {
  name: "CityPicker",
  components: {},
  props: {
    // 选择的地区数据
    cityPickerData: {
      type: Object,
      default: () => {}
    },
    // 显示几层地区选择
    regionPickerLevel: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    regionData: {
      handler(newVal, oldVal) {
        this.$emit("update:cityPickerData", newVal);
      },
      deep: true
    }
  },
  data() {
    return {
      provinceData: [],
      cityData: [],
      areaData: [],
      streetData: [],
      regionData: {
        provinceVal: "",
        cityVal: "",
        areaVal: "",
        streetVal: ""
      },
      init: {
        province: false,
        city: false,
        area: false,
        street: false
      }
    };
  },
  created() {},
  beforeMount() {
    this.getProvinceData();
    this.initCityPicker();
  },
  mounted() {},
  methods: {
    /**
     * 初始化区域选择层级
     */
    initCityPicker() {
      let initData = this.regionPickerLevel;
      if (initData.length == 0) {
        for (let key in this.init) {
          this.init[key] = true;
        }
      } else {
        initData.forEach(item => {
          this.init[item] = true;
        });
      }
    },
    /**
     * 获取省份
     */
    getProvinceData() {
      this.getRegionDataPublic({ type: "province" });
    },

    /**
     * 选择省份，获取城市
     */
    getCityData(val) {
      this.resetValue({ type: "city" });
      this.getRegionDataPublic({ type: "city", province_code: val });
    },

    /**
     * 选择城市，获取区县
     */
    getAreaData(val) {
      this.resetValue({ type: "area" });
      this.getRegionDataPublic({ type: "area", city_code: val });
    },

    /**
     * 选择区县，获取街道
     */
    getStreetData(val) {
      this.resetValue({ type: "street" });
      this.getRegionDataPublic({ type: "street", area_code: val });
    },

    /**
     * 获取地区数据
     */
    getRegionDataPublic(params) {
      GetCityPicker(params)
        .then(res => {
          this[`${params.type}Data`] = res.data.data.data;
        })
        .catch();
    },

    /**
     * 重置选择
     */
    resetValue(params) {
      const regionValue = {
        city: ["cityVal", "areaVal", "streetVal"],
        area: ["areaVal", "streetVal"],
        street: ["streetVal"]
      };
      // 清空指定的key
      regionValue[params.type].forEach(ele => {
        this.regionData[ele] = "";
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
