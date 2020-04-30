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
        <div class="progress">
          <div class="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
            style="width: 0%">
          </div>
        </div>
      </div>
    `,
    render(data) {
      $(this.el).html(this.template)
    },
    showProgress() {
      $('.progress').css('opacity', 1)
    },
    hideProgress() {
      $('.progress').css('opacity', 0)
    },
    resetProgress() {
      this.hideProgress()
      $('.progress-bar')
        .attr('aria-valuenow', 0)
        .css('width', '0%')
    },
    updateProgress(value) {
      $('.progress-bar')
        .attr('aria-valuenow', value)
        .css('width', `${value}%`)
    }
  }

  const controller = {
    init(model, view) {
      this.model = model
      this.view = view
      this.view.render(this.model.data)
      this.initQiniu()
    },

    initQiniu() {
      $.get('http://localhost:8888/uptoken', (data) => {
        const token = data.uptoken
        const config = {
          useCdnDomain: true,
          region: null
        }
        const putExtra = {
          fname: "",
          params: {},
          mimeType: null
        }
        this.uploadWithSDK(token, putExtra, config)
      })
    },

    uploadWithSDK(token, putExtra, config) {
      $("#dragArea input[type='file']").unbind("change").bind("change", (e) => {
        var file = e.currentTarget.files[0]
        var observable
        if (file) {
          this.view.showProgress()
          var key = file.name
          putExtra.params["x:name"] = key.split(".")[0]
          // 设置next,error,complete对应的操作，分别处理相应的进度信息，错误信息，以及完成后的操作
          var next = (response) => {
            this.view.updateProgress(response.total.percent)
          }
          var complete = (res) => {
            setTimeout(() => {
              this.view.resetProgress()
              $(e.currentTarget).val('')
              window.eventhub.emit('upload', {
                song: res['x:name'],
                url: `http://q8gllkohk.bkt.clouddn.com/${encodeURI(res.key)}`
              })
            }, 500);
          }
          var error = function (err) {
            this.view.resetProgress()
            $(e.currentTarget).val('')
            alert("upload error:" + JSON.stringify(err))
          }
          var subObject = {
            next: next,
            error: error,
            complete: complete
          }
          var subscription
          // 调用sdk上传接口获得相应的observable，控制上传和暂停
          observable = qiniu.upload(file, key, token, putExtra, config)
          subscription = observable.subscribe(subObject)
        }
      })
    }
  }

  controller.init(model, view)
}