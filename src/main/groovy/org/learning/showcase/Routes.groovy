package org.learning.showcase

import io.vertx.core.Handler
import io.vertx.core.Vertx
import io.vertx.ext.web.Router
import io.vertx.ext.web.RoutingContext
import io.vertx.ext.web.handler.StaticHandler
import org.learning.groovypath.PathBuilder
import org.learning.vertx.BaseVerticle

class Routes {

    static APP_ROUTES = [
            '/':Showcase.&index,
    ]

    static REDTURTLE_ROUTES = [
            '/redturtle':Showcase.&redTurtle
    ]

    static Router setRoutes(Map<String, Handler<RoutingContext>> routes, Router router) {
        router.route("/webroot/*").handler(StaticHandler.create().setWebRoot(PathBuilder.path(BaseVerticle.webroot)))
        routes.each {
            router.route(it.key).handler(it.value)
        }
        router
    }

    static Router initRouter(Vertx vertx) {
        def router = Router.router(vertx)
        setRoutes(APP_ROUTES + REDTURTLE_ROUTES, router)
    }
}
