package org.learning.vertx

import de.neuland.jade4j.JadeConfiguration
import de.neuland.jade4j.template.FileTemplateLoader
import io.vertx.core.AbstractVerticle
import io.vertx.core.http.HttpHeaders
import io.vertx.core.http.HttpServerResponse
import org.learning.groovypath.PathBuilder
import org.pmw.tinylog.Configurator
import org.pmw.tinylog.Level
import org.pmw.tinylog.Logger
import org.pmw.tinylog.labelers.CountLabeler
import org.pmw.tinylog.policies.SizePolicy
import org.pmw.tinylog.writers.RollingFileWriter

import java.nio.charset.StandardCharsets

abstract class BaseVerticle extends AbstractVerticle {
    static String templateDirName = 'templates'
    static List<String> webroot = ['build', 'resources', 'main', 'webroot']
    static String webrootPath = PathBuilder.path([PathBuilder.workingDirectory()] + webroot)
    static FileTemplateLoader templateLoader = new FileTemplateLoader(webrootPath, StandardCharsets.UTF_8.toString())
    static JadeConfiguration jade = new JadeConfiguration()

    static {
        jade.setTemplateLoader(templateLoader)
    }

    static String renderHtml(String template, Map<String, Object> model = [:]) {
        List<String> projectName = template.split('\\.')
        def size = projectName.size()
        List<String> names = size > 1 ? [projectName.get(0), templateDirName] + projectName.subList(1, size) : [templateDirName, template]
        jade.renderTemplate(jade.getTemplate(PathBuilder.path(names, '/', '/')), model)
    }

    static HttpServerResponse htmlContentType(HttpServerResponse response) {
        response.putHeader(HttpHeaders.CONTENT_TYPE, "${HttpHeaders.TEXT_HTML}; charset=${StandardCharsets.UTF_8}")
    }

    static void initLogger() {
        CountLabeler
        Configurator.currentConfig()
                .level(Level.INFO)
                .maxStackTraceElements(20).formatPattern("{pid}:{level}:{date}: {message}")
                .writer(new RollingFileWriter(PathBuilder.path(['logs', 'log.txt']),
                10,
                new CountLabeler(),
                new SizePolicy(10 * 1024)))
                .writingThread('vert.x-eventloop-thread-1')
                .activate()
        Logger.info('logger ready.')
    }
}