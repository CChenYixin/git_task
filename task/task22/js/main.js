(function(){

    var duration = 50
    function writeCode(prefix,code,fn){
      let container  = document.querySelector('#code')
      let styleTag = document.querySelector('#style-tag')
      let n = 0
      let timer
      timer = setTimeout(function run(){
        n+=1
        container.innerHTML = code.substring(0,n)
        styleTag.innerHTML = code.substring(0,n)
        container.scrollTop = container.scrollHeight;

        if(n<code.length){
          timer = setTimeout(run,duration)
        }else{
          fn && fn.call()
        }
      },duration)
    }

    let code = `

    /* css main */

    .preview {
      display: flex;
      justify-content: center;
      align-items: center;
      height:100%;
      background-color: #fcdb40;
    }
    .wrapper {
      position: relative;
      width: 100%;
      height: 165px;
    }
    .wrapper > :not(:last-child){
      z-index: 1;
    }
    
    /* nose */
    
    .nose {
      position: absolute;
      left: 50%;
      top: 28px;
      transform: translateX(-50%);
    
      width: 0;
      height: 0;
    
      border: 11px solid;
      border-color: black transparent transparent transparent;
      border-radius: 50%;
    }
    
    /* eye */
    
    .eye {
      position: absolute;
      width: 49px;
      height: 49px;
    
      border-radius: 50%;
      border: 2px solid black;
    
      background-color: #2e2e2e;
    }
    .eye.left {
      right: 50%;
      margin-right: 90px;
    }
    .eye.right {
      left: 50%;
      margin-left: 90px;
    }
    .eye::before {
      position: absolute;
      left: 6px;
      top: -1px;
      display: block;
      content: " ";
      width: 24px;
      height: 24px;
    
      border-radius: 50%;
      border: 2px solid black;
      background-color: white;
    }
    
    /* face */
    
    .face {
      position: absolute;
      top: 85px;
    
      width: 68px;
      height: 68px;
      border-radius: 50%;
      border: 2px solid black;
      background-color: #fc0d1c;
    }
    .face.left {
      right: 50%;
      margin-right: 116px;
    }
    .face.right {
      left: 50%;
      margin-left: 116px;
    }
    
    /* mouth */
    
    .upper-lip{
      position: absolute;
      top:50px;
      width: 80px;
      height: 20px;
      background-color: #fcdb40;
      border: 3px solid black;
    }
    .upper-lip.left{
      border-top:none;
      border-right: none;
      border-bottom-left-radius: 40px 25px;
      right: 50%;
      transform: rotate(-20deg)
    
    }
    .upper-lip.right{
      border-top:none;
      border-left: none;
      border-bottom-right-radius: 40px 25px;
      left:50%;
      transform: rotate(20deg)
    }
    
    .lower-lip-wrapper{
      position: absolute;
      bottom: 0;
      left:50%;
      height: 110px;
      width: 300px;
      transform: translateX(-50%);
      overflow: hidden;
    }
    .lower-lip{
      position: absolute;
      bottom: 0;
      width: 300px;
      height: 3000px;
      background-color: #990513;
      border-radius: 200px/2000px;
      border: 2px solid black;
      overflow: hidden;
    }
    .lower-lip::after{
      position: absolute;
      left: 50%;
      bottom: -20px;
      transform: translateX(-50%);
      content: ' ';
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: #fc4a62;
    }`

    writeCode('',code);


    $('.action').on('click','button',function(e){
      let $button = $(e.currentTarget)
      let speed = $button.attr('data-speed')
      $button.addClass('active').siblings('.active').removeClass('active')

      switch(speed){
        case 'slow':
          duration = 100
          break
        case 'normal':
          duration = 50
          break
        case 'fast':
          duration = 10
          break
      }

    })









})();