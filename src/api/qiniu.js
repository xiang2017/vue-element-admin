import request from '@/utils/request'

var qiniu = require('qiniu-js')

export function getToken(name) {
  return request({
    url: '/image_token',
    method: 'get',
    params: {
      name
    }
  })
}

export function upload(file, complete, error, next){
  console.log(file);

  request({
    url: '/image_token',
    method: 'get',
    params: {
      name: file.name
    }
  }).then(response => {
    const url = response.data.qiniu_url;
    var observable = qiniu.upload(
      file,
      response.data.qiniu_key,
      response.data.qiniu_token,
      {
        fname: file.name,
        params: {},
        mimeType: file.type
      }, {
        useCdnDomain: false
      }
    );

    var subscription = observable.subscribe({
      next: function(res){
        next && next(res)
      },
      error: function(err){
        error && error(err)
      },
      complete: function(res){
        complete && complete(res, url)
      }
    });
  }).catch(err => {
    error && error(err)
  });
}
