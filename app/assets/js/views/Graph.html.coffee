define ["underscore"], (_) ->
  _.template '''
    <div class="feedBox">
      <div class="container" style="margin:10px;">
        <div>
          <b><%= model.get("title") %></b>
        </div>
        <div style="clear:both; word-wrap:break-word; float:left;">
          <%= model.get("content") %>
        </div>
      </div>
    </div>
  '''
  # <div class="span9">
  #   <hr style="left:0px;">
  # </div>
