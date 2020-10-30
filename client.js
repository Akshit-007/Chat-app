const socket=io('http://localhost:8000');

const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer=document.querySelector('.container');


var audio=new Audio('Ding-sound-effect.mp3');

const append=(message,position)=>{
  const messageelement=document.createElement('div');
  messageelement.innerHTML=message;
  messageelement.classList.add('message');
  messageelement.classList.add(`${position}`);
  messageContainer.append(messageelement);
  if(position=='left')
  {
  audio.play();
  }
}

const appendj=(message,position)=>{
    const messageelement=document.createElement('div');
    messageelement.innerHTML=message;
    messageelement.classList.add('message');
    messageelement.classList.add(`${position}`);
    messageelement.classList.add(`join`);
    messageContainer.append(messageelement);
    if(position=='left')
    {
    audio.play();
    }
  }
  
  const appendl=(message,position)=>{
    const messageelement=document.createElement('div');
    messageelement.innerHTML=message;
    messageelement.classList.add('message');
    messageelement.classList.add(`${position}`);
    messageelement.classList.add(`leave`);
    messageContainer.append(messageelement);
 
    
    audio.play();
    
  }



form.addEventListener('submit',(e)=>{
   
    e.preventDefault();
    const message=messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value="";

});

const name=prompt('Enter your name to join');
socket.emit('new-user-joined',name);

socket.on('user-joined',name=>{
      appendj(`${name} joined the chat`,'right');
});
socket.on('receive',data=>{
    append(`${data.name}:${data.message}`,'left');
});
socket.on('left',name=>{
    appendl(`${name} left the chat`,'left');
});