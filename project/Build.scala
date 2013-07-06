import sbt._
import Keys._
import play.Project._

object ApplicationBuild extends Build {

  val appName         = "opendata"
  val appVersion      = "1.0-SNAPSHOT"

  val appDependencies = Seq(
    // Add your project dependencies here,
    jdbc,
    anorm,
    "org.mockito" % "mockito-all" % "1.9.5" % "test",
    "com.google.inject" % "guice" % "3.0",
    "com.typesafe" %% "scalalogging-slf4j" % "1.0.1"
  )


  val main = play.Project(appName, appVersion, appDependencies).settings(
    // Add your own project settings here      
  )

}
