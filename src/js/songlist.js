{
  const model = {
    data: {
      songList: []
    },
    getSongList() {
      var songs = new AV.Query('Songs')
      return songs.find().then((data) => {
        this.data.songList = data.map(item => {
          return {
            id: item.id,
            ...item.attributes
          }
        })
      })
    }
  }

  const view = {
    el: '#layout > aside',
    template: `
      <div id="asideTitle" class="bg-light text-center">歌曲列表</div>
      <div id="asideSongList">
        <ul class="list-group list-group-flush"></ul>
      </div>
    `,
    render(data) {
      $(this.el).html(this.template)
      data.songList.map(item => {
        $(`
          <button type="button" class="list-group-item list-group-item-action" data-id="${item.id}">
            <div class="d-flex w-100 justify-content-between align-items-center">
              ${item.song}
              <small>${item.singer}</small>
            </div>
          </button>
        `)
          .appendTo($(this.el).find('ul.list-group'))
      })
    },
    removeActive() {
      $(this.el).find('button.list-group-item').removeClass('active')
    },
    addActive(element) {
      $(element).addClass('active')
    }
  }

  const controller = {
    init(model, view) {
      this.model = model
      this.view = view
      this.view.render(this.model.data)
      this.bindEvents()
      this.model.getSongList().then(
        () => {
          this.view.render(this.model.data)
        }
      )
      window.eventhub.on('create', (data) => {
        this.model.data.songList.push(data)
        this.view.render(this.model.data)
      })
      window.eventhub.on('update', (data) => {
        for (let i = 0; i < this.model.data.songList.length; i++) {
          if (this.model.data.songList[i].id === data.id) {
            Object.assign(this.model.data.songList[i], data)
            break
          }
        }
        this.view.render(this.model.data)
      })
      window.eventhub.on('closeModal', () => {
        this.view.removeActive()
      })
    },
    bindEvents() {
      $(this.view.el).on('click', 'button.list-group-item', (e) => {
        let data
        this.view.removeActive()
        this.view.addActive(e.currentTarget)
        let id = $(e.currentTarget).attr('data-id')
        for (let i = 0; i < this.model.data.songList.length; i++) {
          if (this.model.data.songList[i].id === id) {
            data = this.model.data.songList[i]
            break
          }
        }
        window.eventhub.emit('select', data)
      })
    }
  }

  controller.init(model, view)
}