{
  const model = {}
  const view = {
    el: 'main',
    template: `
      <div id="uploadContainer">
        <div id="dragArea" class="rounded text-center text-black-50">
          <p>点击或拖拽上传</p>
          <p>单个文件最大限制 10M</p>
          <input type="file">
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
      this.view.render(this.model.data)
    }
  }

  controller.init(model, view)
}