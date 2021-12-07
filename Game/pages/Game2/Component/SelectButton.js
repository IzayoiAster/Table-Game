// pages/Game2/SelectButton.js
Component({
  properties: {
    identifier: Number,
    bclr: String,
    isSelected: Boolean,
    disabled: Boolean
  },

  data: {
  },

  methods: {
    changeStatus() {
      this.setData({
        isSelected: !this.data.isSelected
      });
      var status = this.data.isSelected;
      var id = this.data.identifier;
      this.triggerEvent('Res', [id, status]);
    }
  }
})
