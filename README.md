##### Build the fat jar
```
gradle --no-daemon shadowJarMin
```

##### running using start for vertx list purposes (vertx-id optional)
```
java -jar build/libs/showcase.jar start <--vertx-id=x>
```
##### run basic
```
java -jar build/libs/showcase.jar
```
##### redeploy mode
```
java -jar build/libs/showcase.jar --redeploy=src/**/* --on-redeploy="gradle shadowJar"
```

##### commands (optional)
* -Dcommand=find-publications (defaults to update-publications)

#### IDE run/debug configs (Cannot use debugger while using redeploy mode)
* Application
* main class: io.vertx.core.Launcher
* program args: run groovy:org.learning.showcase.Showcase -cp build/libs/showcase.jar

##### deployment (heroku)
 - heroku login
 - cd showcase
 - heroku create
 - heroku local web
 - localhost:5000
 
#### heroku remote deploy
 - git push heroku master
 - heroku open
