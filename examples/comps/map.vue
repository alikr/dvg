<template>
	<div>
		<v-map
			ref="world"
			@mapInit="map1Init"
			@redraw="map1Init"
			:width="800"
			:height="500">
			<path :d="path" fill="#ff0"></path>
			<text fill="#f00" dy="10" :x="x" :y="y">text1</text>
		</v-map>

		<v-map
			:width="800"
			:height="500"
			geo-url="/data/geojson/china.json"
			:text-show="false">
		</v-map>

		<v-map
			:width="800"
			:height="500"
			:path-attrs="{'fill':'#000','stroke':'#999'}"
			:text-attrs="{'fill':'#f00'}">
		</v-map>
	</div>
</template>
<script>
  export default {
  	data(){
  		return {
  			x: 0,
  			y: 0,
  			path: '',
  		}
  	},
  	methods:{
  		map1Init:function(projection, path){
	  		const pos = projection([120,60]);
	  		this.x = pos[0];
	  		this.y = pos[1];

	  		var someGeoJson = {"type": "Feature","geometry":{"type":"Point","coordinates":[120,60]}};
	  		this.path = path(someGeoJson);
  		},
  	}
  }
</script>