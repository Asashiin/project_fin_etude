function saveData() {}
$.ajax({
  type: 'POST',
  url: '/snpInfo/dlExcel',
  data: {
    'test': "test"
  },
  success: function (data, textStatus, request) {
    /* var download_id = data['id'];
      // Could also use the link-click method.
      window.location = '/path/to/download?id=' + download_id; */
  }
});
