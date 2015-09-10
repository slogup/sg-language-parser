module.exports = function (options) {
    return function (req, res, next) {

        var acceptLang = req.get('accept-language');
        var langs = (acceptLang && acceptLang.split(',')) || null;

        if (langs) {
            var codeAndQ = langs[0].split(';');
            var code = (codeAndQ[0] && codeAndQ[0].split('-')) || null;

            if (code) {
                var lang = code[0] && code[0].toLowerCase() || null;
                if (lang && options.languages[lang]) req.lang = lang.toLowerCase();
                else req.language = null;

                var country = code[1] && code[1].toLowerCase() || null;
                if (country && options.countries[country]) req.country = country.toUpperCase();
                else req.country = null;
            }
        }

        if (req.language == null) req.language = options.defaultLanguage;
        if (req.country == null) req.country = options.defaultCountry;

        next();
    };
}