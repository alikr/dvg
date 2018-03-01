<template>
  <div class="body">
    <nav class="nav">
      <h1 class="doc-title">Example</h1>
      <ul class="nav-con">
        <li class="nav--item"><router-link to="/map">map</router-link></li>
      </ul>
    </nav>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>
<style lang="css">
	html,body{
    height: 100%;
		margin: 0;
		padding: 0;
		font-size: 14px;
	}
  .body{
    height: 100%;
  }
  .doc-title{
    text-align: center;
  }
  .nav{
    width:200px;
    height: 100%;
    float: left;
    background: #FAFAFA;
  }
  .nav-con{
    margin:0;
    padding:0;
  }
  .nav--item{
    list-style: none;
    margin:0;
    padding:0;
  }
  .nav--item a{
    display: block;
    color: #2194CE;
    text-decoration: none;
    line-height: 24px;
    padding-left: 10px;
  }
  .nav--item a:hover,
  a.link-actived{
    color: #FAFAFA;
    background: #2194CE;
  }
  .main{
    margin-left:210px;
  }
</style>