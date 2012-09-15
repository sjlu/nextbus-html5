var Frontpage = function()
{
    var exports = {}

    function set_title(title)
    {
        $('h3#title').html(title);
    }
    exports.set_title = set_title;

    function write_prediction(d)
    {
        console.log(d);

        times = [];
        for (var i in d.predictions)
            times.push(d.predictions[i].minutes);

        var first = times.shift();

        var html = '<td>'+d.line.title+'</td><td><span class="label label-inverse">'+first+' minutes</span><br />'+times.join(", ")+'</td>';

        var elem = $("tr."+d.line.tag+"."+d.line.direction.tag);
        if (elem.is('*'))
            elem.html(html);
        else
            $('tbody').append('<tr class="'+d.line.tag+' '+d.line.direction.tag+'">'+html+'</tr>');

    }
    exports.write_prediction = write_prediction;

    function init()
    {

    }
    exports.init = init;

    return exports;
};