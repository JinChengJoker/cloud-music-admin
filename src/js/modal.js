{
  const model = {
    data: {
      title: '',
      song: '',
      singer: '',
      url: ''
    }
  }
  const view = {
    el: '#modal',
    template: `
      <div class="modal fade" id="staticBackdrop" data-backdrop="static" tabindex="-1" role="dialog"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">__title__歌曲</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="song">歌曲</label>
                  <input type="text" class="form-control" name="song" value="__song__">
                </div>
                <div class="form-group">
                  <label for="singer">歌手</label>
                  <input type="text" class="form-control" name="singer" value="__singer__">
                </div>
                <div class="form-group">
                  <label for="url">链接</label>
                  <input type="text" class="form-control" name="url" value="__url__">
                </div>
                <button type="submit" class="btn btn-primary">保存</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    `,
    render(data) {
      let html = this.template
      for(let key in data) {
        html = html.replace(`__${key}__`, data[key])
      }
      $(this.el).html(html)
    }
  }
  const controller = {
    init(model, view) {
      this.model = model
      this.view = view
      this.view.render(this.model.data)
      window.eventhub.on('upload', (data) => {
        Object.assign(this.model.data, data, { title: '上传' })
        this.view.render(this.model.data)
        $('#staticBackdrop').modal('show')
      })
    }
  }

  controller.init(model, view)
}