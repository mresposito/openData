package org.opendata.data

import play.api.test._
import play.api.test.Helpers._
import org.mockito.Mockito._
import org.junit._
import org.junit.Assert._
import play.api.libs.json.Json
import play.api.libs.json._
import play.api.libs.iteratee._
import org.opengraph.data._

trait TestData {

  import DataFormatter._
  
  val USERID = 0
  
  val newGraph = NewGraph("simpleGraph", USERID, None)
  val simpleGraph = CreateGraph(newGraph, None)

  def dump[T](point: T) = Json.toJson(simpleGraph)
}

class RestControllerTest extends TestData {

  var controller: DataController = _

  @Before
  def setup = {
    controller = new DataController 
  }

  def request(method: String, location:String, json: JsValue) = 
    FakeRequest(method, location)
      .withHeaders(("Content-Type", "application/json"))
      .withJsonBody(json)

  def restRequest(method: String, json: JsValue) = request(method, "/v1/data", json)
  
  // @Test
  // def basicPost = {
  //   val r = controller.post(restRequest(POST, dump(simpleGraph))).fold {
  //     case Step.Done(req, _) =>
  //       assertEquals(status(req), 200)
  //   }
    // assertEquals(r.length, 1)
    // val req = r.head
    // assertEquals(status(req), 200)
    // assertTrue(req.get.content contains "graph recieved")
    // assertTrue(req.get.body contains "graph recieved")
  // }

  // @Test
  // def variousPost = {
  //   val r = controller.post(restRequest(POST, dump(simpleGraph)))
  // }
}
