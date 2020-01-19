var app = {};
app.view = function (content) {
    return m("div#wrapper.container-fluid.h-100",[
        app.sideNav(), app.nav(),
            m("div.row.h-100", [
                m("div.my-auto", content)
            ])
    ]);
};
app.videoView = function (content) {
    return m("div#wrapper.container-fluid.h-100",[
        app.sideNav(), app.nav(),
        m("div.row.h-100", content)
    ]);
};
app.backgroundView = function (content) {
    var i = 5;
    return m("div#wrapper.container-fluid",[
        app.sideNav(), app.nav(".fixed"), m("div.background-wrap", [
            m("video#video-bg-elem.hidden-sm-down[preload=auto][autoplay=true][loop=loop][muted=muted]", [
                m("source[src='/webroot/redturtle/redturtle.mp4'][type=video/mp4]", 'video not supported')
            ]),
            m("img#video-bg-elem.d-block.img-fluid.hidden-md-up[srcset='" +
                "/webroot/redturtle/img/" + i + "-sm.png 500w']" +
                "[sizes='(max-width: 543px) 100%, 100%']" +
                "[src='/webroot/redturtle/img/" + i + "-md.png 800w'][alt='slide " + i + "']"),
            m("div.content", content)
        ])
    ]);
};
app.nav = function (classes) {
    classes = classes ? classes : '';
    return m("div.hidden-sm-down", [
        m("ul.nav.justify-content-center" + classes, [
            m("li.nav-item", [
                m("a.nav-link[href=/]", {config: m.route, class:m.route() == '/' ? 'active' : ''}, "HOME")
            ]),
            m("li.nav-item", [
                m("a.nav-link[href=/about]", {config: m.route, class:m.route() == '/about' ? 'active' : ''}, "ABOUT")
            ]),
            m("li.nav-item", [
                m("a.nav-link[href=/trailer]", {config: m.route, class: m.route() == '/trailer' ? 'active' : ''}, "TRAILER")
            ]),
            m("li.nav-item", [
                m("a.nav-link[href=/gallery]", {config: m.route, class: m.route() == '/gallery' ? 'active' : ''}, "GALLERY")
            ])
        ])
    ]);
};
app.sideNav = function () {
    return m("div.hidden-md-up", [
        m("button#menu-toggle.navbar-toggler[type=button]", { onclick: app.vm.toggle }, app.vm.sideNavText()),
        m("div#sidebar-wrapper", [
            m("ul.sidebar-nav", [
                m("li[style='border-top: white solid 1px;']", [
                    m("a.nav-link[href=/]", {config: m.route, class:m.route() == '/' ? 'active' : '', onclick: app.vm.toggle}, [
                        m("i.fa.fa-home.fa-3[aria-hidden=true]", m.trust("&nbsp;&nbsp;&nbsp;HOME"))
                    ])
                ]),
                m("li", [
                    m("a.nav-link[href=/about]", {config: m.route, class:m.route() == '/about' ? 'active' : '', onclick: app.vm.toggle}, [
                        m("i.fa.fa-info.fa-3[aria-hidden=true]", m.trust("&nbsp;&nbsp;&nbsp;ABOUT"))
                    ])
                ]),
                m("li", [
                    m("a.nav-link[href=/trailer]", {config: m.route, class: m.route() == '/trailer' ? 'active' : '', onclick: app.vm.toggle}, [
                        m("i.fa.fa-play.fa-3[aria-hidden=true]", m.trust("&nbsp;&nbsp;&nbsp;TRAILER"))
                    ])
                ]),
                m("li", [
                    m("a.nav-link[href=/gallery]", {config: m.route, class: m.route() == '/gallery' ? 'active' : '', onclick: app.vm.toggle}, [
                        m("i.fa.fa-picture-o.fa-3[aria-hidden=true]", m.trust("&nbsp;&nbsp;&nbsp;GALLERY"))
                    ])
                ])
            ])
        ])
    ]);
};
app.vm = {};
app.vm.sideNavText = m.prop('☰');
app.vm.toggle = function () {
    $("#wrapper").toggleClass("toggled");
};
var root = document.body;
var Home = {
    controller: function () {
        m.redraw.strategy("diff")
    },
    view: function () {
        return app.backgroundView([
            m("div.text", [
                m("h1", "The Red Turtle"),
                m("p.center", "Written and directed by Michael Dudok de Wit")
            ])
        ]);
    }
};
var About = {
    controller: function () {
        m.redraw.strategy("diff")
    },
    view: function () {
        return app.backgroundView([
            m("div.text", [
                m("p.center.tiny", "Written and directed by Michael Dudok de Wit."),
                m("br"),
                m("h1", "The Red Turtle"),
                m("br"),
                m("br"),
                m("p", "The dialogue-less film follows the major life stages of a castaway on a deserted tropical island populated by turtles, crabs and birds."),
                m("br"),
                m("p", "The Red Turtle adds to Studio Ghibli's estimable legacy with a beautifully animated effort whose deceptively simple story boasts narrative layers as richly absorbing as its lovely visuals.")
            ])
        ]);
    }
};
var Trailer = {
    view: function () {
        return app.videoView([
            m("div.embed-responsive.embed-responsive-16by9.align-middle", [
                m("iframe.embed-responsive-item[src='//youtube.com/embed/XPM1vJx5Wdg?autoplay=1&loop=1&playlist=XPM1vJx5Wdg'][frameborder=0][allowfullscreen]")
            ])
        ]);
    }
};
var Gallery = {
    view: function () {
        return app.view([
            m("div#carouselExampleControls.my-auto.carousel.slide[data-ride=carousel]", [
                m("div.carousel-inner[role='listbox']", [
                    [1, 2, 3, 4, 5].map(function (i) {
                        var active = i == 2 ? '.active' : '';
                        return m("div.carousel-item" + active, [
                            m("img.d-block.img-fluid[srcset='" +
                                "/webroot/redturtle/img/" + i + "-lg.jpg 1000w, " +
                                "/webroot/redturtle/img/" + i + "-md.png 800w']" +
                                "/webroot/redturtle/img/" + i + "-sm.png 600w']" +
                                "/webroot/redturtle/img/" + i + "-xs.png 500w']" +
                                "[sizes='(max-width: 543px) 100%,(max-width: 767px) 100%, (max-width: 991px) 100%, (max-width: 1199px) 100%, 100%']" +
                                "[src='/webroot/redturtle/img/" + i + "-xl.jpg'][alt='slide " + i + "']")
                        ]);
                    })
                ]),
                m("a.carousel-control-prev[href='#carouselExampleControls'][role='button'][data-slide='prev']", [
                    m("span.carousel-control-prev-icon[aria-hidden='true']"),
                    m("span.sr-only", 'Previous')
                ]),
                m("a.carousel-control-next[href='#carouselExampleControls'][role='button'][data-slide='next']", [
                    m("span.carousel-control-next-icon[aria-hidden='true']"),
                    m("span.sr-only", 'Next')
                ])
            ])
        ]);
    }
};
m.route.mode = "hash";
m.route(root, "/", {
    "/": Home,
    "/about": About,
    "/trailer": Trailer,
    "/gallery": Gallery
});