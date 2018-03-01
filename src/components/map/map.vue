<template>
 <svg :width="width" :height="height"
  @dblclick.prevent="dblclick($event)"
  @wheel.prevent="wheel($event)"
  @mousedown.prevent="mousedown($event)"
  @mousemove.prevent="mousemove($event)"
  @mouseup.prevent="mouseup($event)">
	<template v-if="pathShow || textShow" v-for="(item,index) in pathData">
		<path v-if="pathShow && item.path" v-bind="setPathAttrs(item,index)"></path>
		<text v-if="textShow && item.path" v-bind="setTextAttrs(item,index)">{{item.properties.name}}</text>
	</template>
	<slot v-if="ready">
    <g></g>
  </slot>
 </svg>
</template>
<script>
	const d3 = Object.assign({},
	  require("d3-geo"),
    require("d3-path"),
	  require("d3-array"),
    require("d3-request"),
	);
  export default {
  	props:{
  		geoUrl:{
  			default: './data/geojson/world.json'
  		},
  		width:{
  			default: 300
  		},
  		height:{
  			default: 300
  		},
  		textShow:{
  			type: Boolean,
  			default: true
  		},
  		pathShow:{
  			type: Boolean,
  			default: true
  		},
  		pathAttrs: null,
  		textAttrs: null
  	},
  	data(){
  		return {
        ready: false,
  			pathData: [],
  			textStyle:{
  				'text-anchor': 'middle',
  				'font-size': '12px',
  				'fill': 'rgba(0,0,0,0.8)',
  			},
  			pathStyle:{
  				'stroke': 'rgba(30, 120, 180, 0.9)',
  				'stroke-width': 1,
  				'fill':'rgba(30, 120, 180, 0.8)',
  			},
        scale: 1, // 拖动地图projection的scale
        translate: [0, 0], // 拖动地图projection的translate
        initScale: 1, // 初始地图projection的scale
        initTranslate: [0, 0], // 初始地图projection的translate
        features: [], // 地图geoJson
        zoom: 1, // wheel缩放
        scaleExtent: [0, Infinity],
        mouseDown: false,
        mouseStartXY: [0, 0, 0, 0],
  		}
  	},
  	watch:{
  		geoUrl: 'draw'
  	},
  	created(){
  		this.pathStyle = Object.assign(this.pathStyle, this.pathAttrs);
  		this.textStyle = Object.assign(this.textStyle, this.textAttrs);
  		this.draw();
  	},
  	mounted(){
  	},
  	methods:{
  		setTextAttrs(item, index){
  			var attrs = {
  				x: item.position[0],
  				y: item.position[1],
  			}
  			return Object.assign(attrs,this.textStyle);
  		},
  		setPathAttrs(item, index){
  			var attrs = {
  				d: item.path,
  			}
  			return Object.assign(attrs,this.pathStyle);
  		},
  		draw(){
        this.zoom = 1;
  			d3.json(this.geoUrl, (err, geojson) => {
	  			!err && this.setPaths(geojson); 
	  		})
  		},
  		setPaths(geojson){
  			const width = this.width;
	  		const height = this.height;
	  		const features = geojson.features;
        this.features = features;
				const projection = d3.geoMercator()
					.scale(1)
					.translate([0, 0]);

				var path1 = d3.geoPath()
					.projection(projection);

				var bounds = path1.bounds(geojson);
				var scale = 0.98 / Math.max((bounds[1][0] - bounds[0][0]) / width, (bounds[1][1] - bounds[0][1]) / height);
				var translate = [(width - scale * (bounds[1][0] + bounds[0][0])) / 2, (height - scale * (bounds[1][1] + bounds[0][1])) / 2];

        this.initScale = scale;
        this.scale = scale;
        this.initTranslate = [...translate];
        this.translate = translate;

				projection
					.scale(scale)
					.translate(translate);

		    const path = d3.geoPath().projection(projection);

		    this.$emit('mapInit', projection, path);

			  this.setData();
  		},
      setData(){
        const projection = d3.geoMercator()
          .scale(this.scale * this.zoom)
          .translate(this.translate);
        const path = d3.geoPath().projection(projection);

        this.pathData = this.features.map((d) => {
          return {
            path: path(d) || false,
            properties: d.properties,
            position: path.centroid(d)
          }
        });
        this.ready = true;
        this.$emit('redraw', projection, path);
      },
      dblclick(){
        this.zoom = 1;
        this.scale = this.initScale;
        this.translate = [...this.initTranslate];
        this.setData();
      },
      wheel(e){
        let delta = -e.deltaY * (e.deltaMode ? 120 : 1) / 500;
        let deltaY = this.zoom + delta;
        this.zoom = d3.min([this.scaleExtent[1], d3.max([this.scaleExtent[0], deltaY])]);
        this.setData();
      },
      mousedown(e){
        this.mouseDown = true;
        this.mouseStartXY = [e.clientX, e.clientY, this.translate[0], this.translate[1]];
      },
      mousemove(e){
        if (!this.mouseDown) return;
        var dx = e.clientX - this.mouseStartXY[0];
        var dy = e.clientY - this.mouseStartXY[1];
        this.translate[0] = this.mouseStartXY[2] + dx;
        this.translate[1] = this.mouseStartXY[3] + dy;
        this.setData();
      },
      mouseup(e){
        this.mouseDown = false;
        var dx = e.clientX - this.mouseStartXY[0];
        var dy = e.clientY - this.mouseStartXY[1];
        this.translate[0] += dx;
        this.translate[1] += dy;
        this.setData();
      }
  	}
  }
</script>