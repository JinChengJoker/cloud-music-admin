{
  const model = {
    data: {
      songList: [
        {
          id: 1,
          song: '七里香',
          singer: '周杰伦'
        },
        {
          id: 2,
          song: '一路向北',
          singer: '周杰伦'
        },
        {
          id: 3,
          song: '枫',
          singer: '周杰伦'
        }
      ]
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
    }
  }

  controller.init(model, view)
}