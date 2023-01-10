let Browse = document.getElementById('Browse')
let upload = document.getElementById('upload')
let file = document.getElementById('file')
let show_files = document.getElementById('show_files')
let progress_bar = document.getElementById('progress_bar')
let progress_text = document.getElementById('progress_text')
let fetch_show_file = document.getElementById('fetch_show_file')
let draggable = document.getElementById('drop-zone')




file.addEventListener('change', () => {


  show_files.innerHTML = ""

  let files = file.files

  for (let index = 0; index < files.length; index++) {
    const element = files[index];
    let data = new Date()
    show_files.innerHTML += `<div class="list-group-item list-group-item-danger my-3 rounded bg-primary"><span
    class="badge alert-danger pull-right position-relative" style="right: 10px;">${data.getDay()}-${data.getMonth()}-${data.getFullYear()}</span>${element.name}</div>`


    upload.addEventListener('click', () => {
      progress_bar.style.width = `${0}%`
      progress_text.innerText = 0
      show_files.innerHTML = ''
      Upload_File(element)
    })
  }



})




// Creating the all function


// Fast function Upload File function
function Upload_File(files) {
  const formData = new FormData();

  formData.append('file', files);

  const xhr = new XMLHttpRequest();

  xhr.open('POST', '/upload');

  xhr.upload.onprogress = function (event) {
    const percentComplete = (event.loaded / event.total) * 100;
    progress_bar.style.width = `${percentComplete}%`
    progress_text.innerText = Math.floor(percentComplete) + "%"
  }


  return new Promise((resolve, reject) => {
    xhr.onload = function () {
      if (xhr.status === 200) {
        resolve();
        File_show()
      } else {
        reject(new Error('Upload failed'));
      }
    }

    xhr.send(formData);
  });
}


// Shwo this all files 
function File_show(){
  fetch('/getfiles').then((res)=> res.json()).then((data)=>{
    fetch_show_file.innerHTML = ''
    data.forEach(element => {
      let start_text = element.substring(0, 5)
      let end_text = element.substring(element.lastIndexOf('.') -5)



      fetch_show_file.innerHTML += `<div class="list-group-item list-group-item-danger my-3 rounded">
      <a href="/download/${element}"class="badge alert-danger pull-right position-relative" style="right: 10px;">23-11-2014<span class="mx-3">
      ${start_text +"...."+end_text}</span></a>
      
      `
    });
  })


}
File_show()
