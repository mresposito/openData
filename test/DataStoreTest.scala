package org.opendata.data

import play.api.test._
import play.api.test.Helpers._
import org.mockito.Mockito._
import org.junit._
import org.junit.Assert._
import play.api.libs.json.Json
import play.api.libs.json._
import org.opengraph.data._

class DataStoreTest extends TestData {

  var store: DataStore = _

  @Before
  def setup {
    store = new DataStore
  }

  @Test
  def insertAndRetrieveGraph {
    running(FakeApplication()) {
      store.createGraph(newGraph)  
      val graphs = store.getGraphs(USERID)
      assertEquals(1, graphs.length)
      assertEquals(newGraph.name, graphs.head.name)
    }
  }

  @Test
  def insertAndRetrieveDataPoints {
    running(FakeApplication()) {
      val id = loadGraphs(store)
      store.createDataPoint(id, simpleDataPoint)
      val points = store.getDataPoints(id)
      assertEquals(1, points.length)
      assertEquals(simpleDataPoint.x, points.head.x)
    }
  }
}
