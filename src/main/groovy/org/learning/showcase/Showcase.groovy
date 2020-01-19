package org.learning.showcase

import io.vertx.core.http.HttpServer
import io.vertx.core.http.HttpServerOptions
import io.vertx.ext.web.RoutingContext
import org.learning.vertx.BaseVerticle
import org.pmw.tinylog.Configurator
import org.pmw.tinylog.Logger

class Showcase extends BaseVerticle {

    HttpServer server

    @Override
    void start() throws Exception {
        initLogger()
        HttpServerOptions serverOptions = new HttpServerOptions()
        serverOptions.setCompressionSupported(true)
        server = vertx.createHttpServer(serverOptions)
        def router = Routes.initRouter(vertx)
        int port = System.getenv('PORT') ? System.getenv('PORT') as int : 8080
        server.requestHandler(router.&accept).listen(port, '0.0.0.0')
        Logger.info('server ready.')
    }

    @Override
    void stop() throws Exception {
        Logger.info('shutting down...')
        Configurator.shutdownWritingThread(false)
        server.close()
    }

    static index(RoutingContext routingContext) {
        htmlContentType(routingContext.response()).end(renderHtml('index'))
    }

    static redTurtle(RoutingContext routingContext) {
        htmlContentType(routingContext.response()).end(renderHtml('redturtle.index', ['title':'Red Turtle']))
    }
}
