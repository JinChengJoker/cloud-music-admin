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
    el: 'aside',
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
          <button type="button" class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between align-items-center">
              ${item.song}
              <small>${item.singer}</small>
            </div>
          </button>
        `)
          .appendTo($(this.el).find('ul.list-group'))
      })
    }
  }

  const controller = {
    init(model, view) {
      this.model = model
      this.view = view
      this.view.render(this.model.data)
      this.model.getSongList().then(
        () => {
          this.view.render(this.model.data)
        }
      )
      window.eventhub.on('create', (data) => {
        this.model.data.songList.push(data)
        this.view.render(this.model.data)
      })
    }
  }

  controller.init(model, view)
}