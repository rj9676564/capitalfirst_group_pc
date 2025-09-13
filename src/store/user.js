import { defineStore } from 'pinia';
 
export const useUserStore = defineStore({
  id: 'user', // 必填且唯一
  state: () => {
    return {
      users:JSON.parse(sessionStorage.getItem('userInfo') || '{}') || {},
      assetInfo:{},
      baseInfo:JSON.parse(sessionStorage.getItem('baseInfo') || '{}') || {}
    };
  },
  actions: {
    updateUsers(userInfo) {
      this.users = userInfo;
      sessionStorage.setItem('userInfo',JSON.stringify(userInfo));
    },
    deleteUsers(){
      this.users = {};
      sessionStorage.removeItem('userInfo');
    },
    updateAsset(asset){
      this.assetInfo = asset;
    },
    updateBaseInfo(info){
      this.baseInfo = info;
      sessionStorage.setItem('baseInfo',JSON.stringify(info));
    }
  }
});