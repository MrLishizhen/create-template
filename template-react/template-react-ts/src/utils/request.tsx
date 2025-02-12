import Axios from 'axios';
import ReactDOM from 'react-dom/client';
import { SpinCom } from '@/components/antd/index';
import { get_sessionStorage } from '@/router/utils';

const VITE_APP_AUTH = import.meta.env.VITE_APP_AUTH;
const VITE_APP_TOKEN = import.meta.env.VITE_APP_TOKEN;
const VITE_APP_BASEURL = import.meta.env.VITE_APP_BASEURL;

let loadingInstance = false;
let needLoadingRequestCount = 0;
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Axios.defaults.baseURL = VITE_APP_BASEURL;
Axios.defaults.timeout = 50000;

function shouLoading() {
  loadingInstance = true;
  const dom = document.createElement('div');
  dom.setAttribute('id', 'loading');
  dom.style.zIndex = '1000';
  document.body.appendChild(dom);
  ReactDOM.createRoot(dom).render(<SpinCom />);
}

function removeLoading() {
  if (needLoadingRequestCount === 0) {
    loadingInstance = false;
    if (document.getElementById('loading')) {
      document.body.removeChild(document.getElementById('loading') as HTMLElement);
    }
  }
}

//请求拦截
Axios.interceptors.request.use(
  config => {
    const token = get_sessionStorage(VITE_APP_AUTH);
    if (token) {
      config.headers[VITE_APP_TOKEN] = token;
    }
    if (config?.loading) {
      if (needLoadingRequestCount === 0) {
        //创建loading效果
        shouLoading();
      }
      //计数
      needLoadingRequestCount++;
    }
    return config;
  },
  function (error) {
    if (loadingInstance) {
      removeLoading();
    }
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);
//响应拦截
Axios.interceptors.response.use(
  response => {
    if (response.config?.loading) {
      needLoadingRequestCount--;
      //判断needLoadingRequestCount的数值
      needLoadingRequestCount = needLoadingRequestCount < 0 ? 0 : needLoadingRequestCount;
      //计数等于0并且有值则关闭loading
      if (needLoadingRequestCount === 0 && loadingInstance) {
        removeLoading();
      }
    }

    return response.data;
  },
  function (error) {
    if (loadingInstance) {
      needLoadingRequestCount--;
      needLoadingRequestCount = needLoadingRequestCount < 0 ? 0 : needLoadingRequestCount;
      if (needLoadingRequestCount === 0 && loadingInstance) {
        removeLoading(); //关闭加载动画
      }
    }
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  },
);

export default Axios;
