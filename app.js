function App(){
  var self = this;
  this.testFile = "test.pdf";
  
  this.init = function(){
    self.handleDragEvents();
    self.bindFilePicker();
    //self.fetchFileAsBlob(); // Firefox
    self.fetchFileAsArrayBuffer(); // Chrome + Firefox
  };
  
  // select files with file picker
  this.bindFilePicker = function(){
    document.getElementById("file-picker").addEventListener("change", function(event){
      self.uploadFiles(event.target.files);
    }, true);
  };
    
  // drag/drop files to dropzone
  this.handleDragEvents = function(){
    var dropZone = document.getElementById('dropzone');
    
    dropZone.addEventListener('dragover', function(event) {
      event.stopPropagation();
      event.preventDefault();
    }, false);
    
    dropZone.addEventListener('drop', function(event) {
      event.stopPropagation();
      event.preventDefault();
      self.uploadFiles(event.dataTransfer.files);
     }, false);
  };
  
  // progress bar
  this.showProgress = function(event, id){
    if (event.lengthComputable) {
      var progressBar = document.getElementById(id);
      progressBar.value = (event.loaded / event.total) * 100;
    }
  };
  
  /* download */
  this.fetchFileAsBlob = function(){    
    //self.download("blob", self.upload);
    self.download("blob", self.uploadAsFormData);
  };
  
  this.fetchFileAsArrayBuffer = function(){
    self.download("arraybuffer", self.uploadArrayBuffer);
  };
  
  this.download = function(responseType, callback){
    var xhr = new XMLHttpRequest;
    xhr.open('GET', self.testFile, true);
    xhr.responseType = responseType;
    
    xhr.onprogress = function(event){
      self.showProgress(event, "download-progress");
    };
    
    xhr.onload = function(event){
      if (this.status != 200) return;
      document.getElementById("download-progress").value = 100;
      callback(this.response);
    };
    
    xhr.send();
  };
  
  /* upload */
  this.uploadArrayBuffer = function(ab){
    window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
    
    var bb = new BlobBuilder;
    bb.append(ab);
    self.uploadAsFormData(bb.getBlob("application/pdf"));
  }
  
  this.uploadAsFormData = function(blob){
    var formData = new FormData;
    formData.append(self.testFile, blob);
    self.upload(formData);
  };
  
  // files is a FileList of File objects
  this.uploadFiles = function(files) {
    var formData = new FormData;

    for (var i = 0, file; file = files[i]; ++i) {
      formData.append(file.name, file);
    }
    
    self.upload(formData);
  };
  
  this.upload = function(data){    
    var xhr = new XMLHttpRequest;
    xhr.open("POST", "./", true);
        
    xhr.upload.onprogress = function(event){
      self.showProgress(event, "upload-progress");
    };
    
    xhr.onload = function(event){
      document.getElementById("upload-progress").value = 100;
    };
    
    xhr.send(data);
  };
}
