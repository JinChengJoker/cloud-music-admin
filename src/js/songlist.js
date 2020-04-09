{
  const model = {}
  const view = {
    el: 'aside',
    template: `
      <div id="asideTitle" class="bg-light text-center">歌曲列表</div>
      <div id="asideSongList">
        <div class="list-group list-group-flush">
          <button type="button" class="list-group-item list-group-item-action" data-toggle="modal"
            data-target="#staticBackdrop">Cras justo odio</button>
          <button type="button" class="list-group-item list-group-item-action active" data-toggle="modal"
            data-target="#staticBackdrop">Dapibus ac facilisis in</button>
          <button type="button" class="list-group-item list-group-item-action" data-toggle="modal"
            data-target="#staticBackdrop">Morbi leo risus</button>
          <button type="button" class="list-group-item list-group-item-action" data-toggle="modal"
            data-target="#staticBackdrop">Porta ac consectetur ac</button>
          <button type="button" class="list-group-item list-group-item-action" data-toggle="modal"
            data-target="#staticBackdrop">Vestibulum at eros</button>
        </div>
      </div>
    `,
    render(data) {
      $(this.el).html(this.template)
    }
  }
  const controller = {
    init(model, view) {
      this.model = model
      this.view = view
      this.view.render()
    }
  }

  controller.init(model, view)
}