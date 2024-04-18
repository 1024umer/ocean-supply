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

div#root {
    display: flex;
    padding-top: 40px;
}

div#root nav.px-2.py-2\.5.dark\:border-gray-700.dark\:bg-gray-800.sm\:px-4.rounded.bg-gray-50 {
    position: absolute;
    width: 100%;
    top: 0;
    z-index: 999999;
    padding: 10px 20px;
}
div#root nav.w-64.h-screen {
    z-index: 99999;
}
div#root section.container.mx-auto h1.font-bold.text-3xl.text-center.mt-10.mb-10 {
    z-index: 9999999;
    position: relative;
}


div#root section.containe .relative {
    position: relative;
    z-index: 999999999999999;
}

div#root section.container table.w-full.text-left.text-sm.text-gray-500.dark\:text-gray-400 {
    z-index: 9999999;
    position: relative;
}
div#root section.container table.w-full.text-left.text-sm.text-gray-500.dark\:text-gray-400 th {
    text-align: center;
}
div#root nav.w-64.h-screen {
    height: 95vh !important;
}
</style>
<body>
    <div id="root">

    </div>
</body>
@viteReactRefresh
@vite('resources/js/app.jsx')

</html>
