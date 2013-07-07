package org.opengraph.data

import play.api._
import play.api.mvc._
import javax.inject.Singleton
import javax.inject.Inject
import play.api.libs.json.Json
import play.api.libs.json._
import com.typesafe.scalalogging.slf4j.Logging

case class Success(success: String)

object DataFormatter {
  implicit val successFormatter = Json.format[Success]
  implicit val graphFormatter = Json.format[Graph]
  implicit val newFormatter = Json.format[NewGraph]
  implicit val dataPointFormatter = Json.format[DataPoint]
  implicit val createGraphFormatter = Json.format[CreateGraph]
  implicit val seriesFormatter = Json.format[Series]
  implicit val plotFormatter = Json.format[Plot]
}

// @Singleton
class DataController extends Controller {

  val dataStore: DataStore = new DataStore
  import DataFormatter._

  def Response(message: String) = Ok(Json.toJson(Success(message)))

  
  def sortPlot(plot: Plot): Plot = {
    val series = plot.series.sortBy{ ser =>
      ser.data.map( _.y ).sum
    }
    Plot(plot.graph, series.reverse take 10)
  }
  /**
   * serves all the graphs for a given user
   * The return object is a sequence
   * of plots in JSON
   */
  def get(userId: Long) = Action {
    val graphs = dataStore.getGraphs(userId)
    val data = graphs.map{ g =>
      dataStore.getDataPoints(g.id).groupBy(_.series)
    }
    val dataSeries = data.map { series =>
      series.map { case(k,v) =>
        Series(k.getOrElse(""), v)
      }
    }
    val plots = graphs.zip(dataSeries).map {
      case(g, d) => Plot(g, d toList)
    }
    val sorted = plots.map(sortPlot)

    Ok(Json.toJson(sorted))
  }

  def post(userId: Long) = Action(parse.json) { request =>
    request.body.validate[CreateGraph].map {
      case create => {
        val id = dataStore.getOrCreate(userId, create.graph)
        create.data.map{ data =>
          dataStore.createDataPoints(id, data, create.series)
        }
        Response("graph recieved")
      }
    }.recoverTotal{
        e => BadRequest("Detected error:"+ JsError.toFlatJson(e))
    }
  }
}

// {
//   "graph": 
//   {
//     "name": "class",
//     "description": "mah"
//   },
//   "series":"name",
//   "points":[
//     [1,3],
//     [2,0],
//     [4,1]
//   ]
// }
