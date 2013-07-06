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

@Singleton
class DataStore @Inject() {

  val db = DB

  implicit val graphParser = long("id") ~
  long("user_id") ~
  str("name") ~
  str("render") ~
  str("description") map {
    case id ~ userId ~ name ~ render ~ description =>
      Graph(id, userId, name, render, Some(description ))
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
}
