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
          <li class="list-group-item d-flex justify-content-between align-items-center">
            ${item.song}
            <span>${item.singer}</span>
          </li>
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