package org.opengraph.data

import play.api._
import play.api.mvc._
import play.api.db._
import play.api.db.DB
import play.api.Play.current
import anorm._
import anorm.SqlParser._
import javax.inject.Singleton
import javax.inject.Inject
import play.api.libs.json.Json

case class Graph (id: Long, userId: Long, name:String, render:String, description: Option[String])

case class NewGraph (name: String, userId: Long, description: Option[String], render:String = "line" )

case class DataPoint(x: String, y: Int, series: Option[String])

case class CreateGraph(graph: NewGraph, data: Option[Seq[DataPoint]], series: String = "default")

case class Series(name: String, data: Seq[DataPoint])

case class Plot(graph: Graph, series: Seq[Series])

@Singleton
class DataStore @Inject() {

  /**
   * Use variable in case
   * we want to do Dipendency Injection in the future
   */
  val db = DB

  /**
   * Parsers
   */
  implicit val graphParser = long("id") ~
    long("user_id") ~
    str("name") ~
    str("render") ~
    str("description") map {
      case id ~ userId ~ name ~ render ~ description =>
        Graph(id, userId, name, render, Some(description ))
    }

  implicit val dataPointParser = str("x") ~
    int("y") ~
    str("series_name") map {
      case x ~ y ~ series => DataPoint(x, y, Option(series))
    }
    

  private[this] val createGraphSql = 
    SQL(""" INSERT INTO graphs
          | (user_id, name, render, description)
          | VALUES
          | ({userId}, {name}, {render}, {description})""".stripMargin)
    
  def createGraph(newGraph: NewGraph) = {
    db.withConnection{ implicit connection =>
      createGraphSql.on(
        'userId -> newGraph.userId,
        'name -> newGraph.name,
        'render -> newGraph.render,
        'description -> newGraph.description.getOrElse("")
      ).executeInsert(scalar[Long].single)
    }
  }

  private[this] val getGraphsSql = 
    SQL("""  SELECT id, user_id, name, render, description
          |    FROM graphs
          |   WHERE user_id = {userId}
          |     AND deleted = 0
          |ORDER BY  id""".stripMargin)

  def getGraphs(userId: Long) = {
    db.withConnection{ implicit connection =>
      getGraphsSql.on(
        'userId -> userId).as(graphParser *)
    }
  }

  // private[this] val createSeriesSql = 
  //   SQL(""" INSERT INTO series
  //           (graph_id, name)
  //           VALUES
  //           (

  private[this] val createDataPointSql = 
    SQL(""" INSERT INTO data_points
            (graph_id, series_name, x, y)
            VALUES
            ({graphId}, {seriesName}, {x}, {y})""".stripMargin)

  def createDataPoint(graphId: Long, dataPoint: DataPoint) = {
    db.withConnection{ implicit connection =>
      createDataPointSql.on(
        'graphId -> graphId,
        'x -> dataPoint.x,
        'y -> dataPoint.y,
        'seriesName -> dataPoint.series.getOrElse("")).executeInsert(scalar[Long].single)
    }
  }

  private[this] val getDataPointsSql = 
    SQL("""  SELECT x, y, series_name
           |   FROM  data_points
           |  WHERE graph_id = {graphId}
           |    AND deleted = 0""".stripMargin)

  def getDataPoints(graphId: Long) = {
    db.withConnection{ implicit connection =>
      getDataPointsSql.on(
        'graphId -> graphId).as(dataPointParser *)
    }
  }
}
