var lang;

function getLanguage(){
    if ( navigator && navigator.userAgent && (lang = navigator.userAgent.match(/android.*\W(\w\w)-(\w\w)\W/i))) {
        lang = lang[1];
    }
    if (!lang && navigator) {
        if (navigator.language) {
            lang = navigator.language;
        } else if (navigator.browserLanguage) {
            lang = navigator.browserLanguage;
        } else if (navigator.systemLanguage) {
            lang = navigator.systemLanguage;
        } else if (navigator.userLanguage) {
            lang = navigator.userLanguage;
        }
        lang = lang.substr(0, 2);
    }

}

function initLocalization(){

    getLanguage();

    $.i18n.properties({
        name:'Messages', //Nombre del fichero
        path:'locations/', //Carpeta donde la incluimos
        mode:'both',  
        language: lang
        //callback: function() {
        //}
    });
}

function init(){
    initLocalization();

    Handlebars.registerHelper('I18n', function(str){
        return ($.i18n != undefined ? $.i18n.prop(str) : str);
    });

    var source          = $('#nuestra-plantilla').html();
    var template        = Handlebars.compile(source);
    var context         = {}
    var html            = template(context);

    $('#viewport').html(html);
}