import axios from 'axios'
export function request(config) {

    //1、创建实例
    const instance = axios.create({
      baseURL:'http://123.207.32.32:8000/api/wh',
      timeout:5000
    })

    //2、axios拦截器
    //拦截器的作用
    //请求拦截
    instance.interceptors.request.use(config=>{
      // console.log(config);
      //1、config中的一些信息不符合服务器的要求

      //2、每次发送网络请求，都希望在界面中显示一个请求图标

      //3、某些网络请求（登录（token）），必须携带一些特殊的信息

      return config
    },error => {
      console.log(error);
    });

    //响应拦截
    instance.interceptors.response.use(res=>{
      return res.data
    }, error => {
      console.log(error);
    });

    //3\发送真正的网络请求
    return instance(config)


}
