package org.opengraph.data

import play.api._
import play.api.mvc._
import javax.inject.Singleton
import javax.inject.Inject
import play.api.libs.json.Json
import play.api.libs.json._
import com.typesafe.scalalogging.slf4j.Logging

case class Graph (id: Long, userId: Long, name:String, render:String, description: Option[String])

case class NewGraph (name: String, userId: Long, description: Option[String], render:String = "line" )

case class DataPoint(x: String, y: Int, series: Option[String])

case class CreateGraph(graph: NewGraph, data: Option[Seq[DataPoint]])

case class Success(success: String)

object DataFormatter {
  implicit val successFormatter = Json.format[Success]
  implicit val graphFormatter = Json.format[Graph]
  implicit val newFormatter = Json.format[NewGraph]
  implicit val dataPointFormatter = Json.format[DataPoint]
  implicit val createGraphFormatter = Json.format[CreateGraph]
}


// @Singleton
class DataController extends Controller {

  import DataFormatter._

  def Response(message: String) = Ok(Json.toJson(Success(message)))

  
  def get = Action {
    Ok
  }

  def post = Action(parse.json) { request =>
    request.body.validate[CreateGraph].map {
      case create => {
        Response("graph recieved")
      }
    }.recoverTotal{
        e => BadRequest("Detected error:"+ JsError.toFlatJson(e))
    }
  }
}

// {
//   "metric": 
//   {
//     "name": "class",
//     "description": "mah"
//   }
//   "measure":
//   {
//     "x":
//     "y":
//     "series":
//   }
// }
