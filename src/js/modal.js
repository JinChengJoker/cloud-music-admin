{
  const model = {
    data: {
      title: '',
      id: '',
      song: '',
      singer: '',
      url: ''
    },
    resetData() {
      this.data = {
        title: '',
        id: '',
        song: '',
        singer: '',
        url: ''
      }
    },
    setData(data) {
      Object.assign(this.data, data, { title: data.id ? '编辑' : '上传' })
    },
    create(data) {
      var Song = AV.Object.extend('Songs')
      var song = new Song()
      song.set('song', data.song)
      song.set('singer', data.singer)
      song.set('url', data.url)
      return song.save()
    },
    update(objectId, data) {
      var song = AV.Object.createWithoutData('Songs', objectId)
      for(let key in data) {
        song.set(key, data[key])
      }
      return song.save()
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
                  <input type="text" class="form-control" name="url" value="__url__" readonly>
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
      for (let key in data) {
        html = html.replace(`__${key}__`, data[key])
      }
      $(this.el).html(html)
    },
    showModal() {
      $('#staticBackdrop').modal('show')
    },
    hideModal() {
      $('#staticBackdrop').modal('hide')
    }
  }

  const controller = {
    init(model, view) {
      this.model = model
      this.view = view
      this.view.render(this.model.data)
      this.bindEvents()
      window.eventhub.on('upload', (data) => {
        this.renderAndShowModal(data)
      })
      window.eventhub.on('select', (data) => {
        this.renderAndShowModal(data)
      })
    },
    bindEvents() {
      $(this.view.el).on('submit', 'form', (e) => {
        e.preventDefault()
        if (this.model.data.id) {
          this.update()
        } else {
          this.create()
        }
      })
      $(this.view.el).on('hidden.bs.modal', '#staticBackdrop', function (e) {
        window.eventhub.emit('closeModal')
      })
    },
    create() {
      const formData = this.getFormData(['song', 'singer', 'url'])
      this.model.create(formData).then(
        (response) => {
          this.view.hideModal()
          window.eventhub.emit('create', {
            id: response.id,
            ...formData
          })
        }
      )
    },
    update() {
      const formData = this.getFormData(['song', 'singer'])
      this.model.update(this.model.data.id, formData).then(
        (response) => {
          this.view.hideModal()
          window.eventhub.emit('update', {
            id: response.id,
            ...formData
          })
        }
      )
    },
    getFormData(dataArr) {
      const formData = {}
      dataArr.map(key => {
        formData[key] = $(this.view.el).find(`form input[name=${key}]`).val()
      })
      return formData
    },
    renderAndShowModal(data) {
      this.model.resetData()
      this.model.setData(data)
      this.view.render(this.model.data)
      this.view.showModal()
    }
  }

  controller.init(model, view)
}