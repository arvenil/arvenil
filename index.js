let m = document.getElementById("markdown");
let md = window.markdownit();

let renderHTML = function() {
    let d = $.Deferred();

    $.get("https://raw.githubusercontent.com/arvenil/resume/master/README.md", function(data) {
        m.innerHTML = md.render(data);
        d.resolve();
    });

    return d.promise();
};

let renderPDF = function () {
    let element = document.body;
    let opt = {
       pagebreak: {
         avoid: ['h1','h2','li','blockquote','code'],
         mode: "css"
       },
       filename:     'Kamil Dziedzic - Software Engineer.pdf',
       image:        { type: 'jpeg', quality: 0.95 },
       html2canvas:  { scale: 2, useCORS: true},
       jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
};

renderHTML().then(renderPDF)
