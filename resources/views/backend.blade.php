<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Ocean Supply</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet">
    @vite('resources/css/app.css')
</head>
<style>
.main-bg{
    background: #fff;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 100% 20%;
}
.main-bg img{
    width: 100%;
}
.card-main{

}
</style>
<body>
    <div id="root">

    </div>
</body>
@viteReactRefresh
@vite('resources/js/app.jsx')

</html>
