const x=document.getElementById("input-box")



const bt=document.getElementById("button")

bt.addEventListener("click",()=>{

    const list=document.getElementById("list")
    const items=document.getElementById("list-items")
    items.innerHTML=''

    const value=x.value

    if (value !== null && value !== "") {

    const newdiv=document.createElement('div')
    newdiv.className= "flex gap-6 items-center mb-6";

    newdiv.innerHTML=`


            

            <li class="font-bold text-xl w-[40%] bg-red-400 py-4" ></li>
            <button class="btn " onclick="strike(this)">Done</button>

            <p id="date" class="font-bold text-lg"> </p>
            <p class="done font-bold text-lg"> </p>


    
    
    `

    const add=newdiv.querySelector('li')
    
        add.textContent = value; // Only set the text content if value is valid


        const now = new Date();
        let hours = now.getHours() % 12 || 12;
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
        const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;

        

    // Select the <p> element inside newDiv (or use the existing one with id="date")
    const timeElement = newdiv.querySelector('#date'); // Assuming this is the <p> you want to update

    console.log("time = ",timeElement)

    // Add the time to the <p> element's text content
    timeElement.textContent = `Task Added: ${timeString}`;
    
list.append(newdiv)
    }



})
function strike(button){


    const parent=button.parentElement

   const lis=parent.querySelector('li')

   if (lis){

   lis.style.textDecoration = "line-through";
   }

   const now = new Date();
        let hours = now.getHours() % 12 || 12;
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
        const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;

   const done = parent.querySelector('.done');
    done.textContent = `Task Done: ${timeString}`;


   





}


