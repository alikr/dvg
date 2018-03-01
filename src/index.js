import vMap from './components/map/index'
const view = {
	vMap,
}

const install = function (Vue) {
  Object.keys(view).forEach((key) => {
      Vue.component(key, view[key]);
  });
}

if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue);
}

export default Object.assign(view, {install});
