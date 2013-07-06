package controllers

import play.api._
import play.api.mvc._

object Application extends Controller {
  
  def index = Action {
    Ok(org.opengraph.pages.html.index("Your new application is ready."))
  }
}
