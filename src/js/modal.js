{
  const model = {}
  const view = {
    el: 'body',
    template: `
      <div class="modal fade" id="staticBackdrop" data-backdrop="static" tabindex="-1" role="dialog"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">编辑歌曲</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="song">歌曲</label>
                  <input type="text" class="form-control" id="song">
                </div>
                <div class="form-group">
                  <label for="singer">歌手</label>
                  <input type="text" class="form-control" id="singer">
                </div>
                <div class="form-group">
                  <label for="url">链接</label>
                  <input type="text" class="form-control" id="url">
                </div>
                <button type="submit" class="btn btn-primary">保存</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    `,
    render(data) {
      $(this.el).append(this.template)
    }
  }
  const controller = {
    init(model, view) {
      this.model = model
      this.view = view
      this.view.render(this.model.data)
    }
  }

  controller.init(model, view)
}